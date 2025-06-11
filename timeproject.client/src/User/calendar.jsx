import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import tr from 'date-fns/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCalendarAlt, faList, faCalendarWeek, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

const locales = {
    'tr': tr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState(Views.MONTH);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showEventForm, setShowEventForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        start: new Date(),
        end: new Date(),
    });

    // Etkinlikleri API'den çek
    const fetchEvents = async () => {
        try {
            const res = await fetch('https://localhost:7120/api/events/GetEvents', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                }
            });

            if (!res.ok) {
                throw new Error(`API hata: ${res.status}`);
            }

            const data = await res.json();
            const formattedEvents = data.map(event => ({
                id: event.eventsId,
                title: event.eventName,
                description: event.description,
                start: new Date(event.dateTime),
                end: new Date(new Date(event.dateTime).getTime() + 60 * 60 * 1000), // 1 saatlik varsayılan süre
            }));
            setEvents(formattedEvents);
        } catch (err) {
            console.error('Etkinlikler yüklenirken hata:', err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSelectSlot = ({ start, end }) => {
        // Seçilen zaman diliminin başlangıç ve bitiş saatlerini ayarla
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        // Eğer başlangıç ve bitiş aynı günse, bitişi 1 saat sonraya ayarla
        if (startDate.toDateString() === endDate.toDateString()) {
            endDate.setHours(startDate.getHours() + 1);
        }

        setNewEvent({
            title: '',
            description: '',
            start: startDate,
            end: endDate,
        });
        setShowEventForm(true);
    };

    const handleSelectEvent = (event) => {
        alert(`${event.title}\n${event.description}`);
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        try {
            // API'ye gönderilecek veriyi hazırla
            const eventData = {
                EventName: newEvent.title,
                Description: newEvent.description,
                DateTime: newEvent.start.toISOString(),
                EndDateTime: newEvent.end.toISOString(), // Bitiş zamanını da ekle
                CreatedByUserID: 1
            };

            console.log('Gönderilen veri:', eventData); // Debug için

            const res = await fetch('https://localhost:7120/api/Events/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(eventData),
            });

            const responseData = await res.json(); // API yanıtını al

            if (res.ok) {
                alert('Etkinlik başarıyla kaydedildi!');
                setShowEventForm(false);
                fetchEvents(); // Etkinlikleri yeniden yükle
                setNewEvent({
                    title: '',
                    description: '',
                    start: new Date(),
                    end: new Date(),
                });
            } else {
                // API'den gelen hata mesajını göster
                alert(`Etkinlik kaydedilemedi: ${responseData.message || 'Bir hata oluştu'}`);
                console.error('API Hata:', responseData);
            }
        } catch (err) {
            console.error('Etkinlik eklenirken hata:', err);
            alert('Etkinlik eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h1>Takvim</h1>
                <div className="calendar-controls">
                    <button 
                        className={`view-button ${view === Views.MONTH ? 'active' : ''}`}
                        onClick={() => setView(Views.MONTH)}
                    >
                        <FontAwesomeIcon icon={faCalendarAlt} /> Ay
                    </button>
                    <button 
                        className={`view-button ${view === Views.WEEK ? 'active' : ''}`}
                        onClick={() => setView(Views.WEEK)}
                    >
                        <FontAwesomeIcon icon={faCalendarWeek} /> Hafta
                    </button>
                    <button 
                        className={`view-button ${view === Views.DAY ? 'active' : ''}`}
                        onClick={() => setView(Views.DAY)}
                    >
                        <FontAwesomeIcon icon={faCalendarDay} /> Gün
                    </button>
                    <button 
                        className={`view-button ${view === Views.AGENDA ? 'active' : ''}`}
                        onClick={() => setView(Views.AGENDA)}
                    >
                        <FontAwesomeIcon icon={faList} /> Liste
                    </button>
                    <button 
                        className="add-event-button"
                        onClick={() => setShowEventForm(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Yeni Etkinlik
                    </button>
                </div>
            </div>

            <div className="calendar-content">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 'calc(100vh - 200px)' }}
                    view={view}
                    onView={setView}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    selectable
                    popup
                    messages={{
                        next: "İleri",
                        previous: "Geri",
                        today: "Bugün",
                        month: "Ay",
                        week: "Hafta",
                        day: "Gün",
                        agenda: "Liste",
                        date: "Tarih",
                        time: "Saat",
                        event: "Etkinlik",
                        noEventsInRange: "Bu aralıkta etkinlik bulunmuyor.",
                    }}
                />
            </div>

            {showEventForm && (
                <div className="event-form-modal">
                    <div className="event-form-content">
                        <h2>Yeni Etkinlik</h2>
                        <form onSubmit={handleEventSubmit}>
                            <div className="form-group">
                                <label>Başlık</label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Açıklama</label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Başlangıç</label>
                                <input
                                    type="datetime-local"
                                    value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                                    onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Bitiş</label>
                                <input
                                    type="datetime-local"
                                    value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                                    onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="submit-button">Kaydet</button>
                                <button type="button" className="cancel-button" onClick={() => setShowEventForm(false)}>
                                    İptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
