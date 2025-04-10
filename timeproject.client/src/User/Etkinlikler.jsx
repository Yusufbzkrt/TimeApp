import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Etkinlikler.css';

const Etkinlikler = () => {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', date: '' });
    const navigate = useNavigate();

    // Etkinlikleri çek
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

            const text = await res.text();
            console.log('API yanıtı:', text);

            if (!text) {
                setEvents([]);
                return;
            }

            const data = JSON.parse(text);
            setEvents(data);

        } catch (err) {
            setEvents([]);
        }
    };



    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (eventsId) => {
        if (!eventsId) {
            alert('Geçersiz etkinlik ID');
            return;
        }

        try {
            const res = await fetch(`https://localhost:7120/api/Events/${eventsId}`, {
                method: 'DELETE',
            });

            const data = await res.text(); // JSON olarak yanıtı al

            if (res.ok) {
                fetchEvents(); // Etkinlikleri güncelle
                alert(data.message || 'Etkinlik başarıyla silindi.');
            } else {
                alert(data.errorText || 'Etkinlik silinirken bir hata oluştu.');
            }
        } catch (err) {
            console.error('Silme hatası:', err);
            alert('Bir hata oluştu.');
        }
    };


    // Güncelleme işlemi
    const handleEdit = (eventsId) => {
        navigate(`/user/etkinlikler/duzenle/${eventsId}`);
    };

    // Etkinlik ekle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://localhost:7120/api/Events/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    EventName: form.title,      
                    Description: form.description,
                    DateTime: form.date,         
                    CreatedByUserID: 1       
                }),
            });

            if (res.ok) {
                setForm({ title: '', description: '', date: '' });
                fetchEvents();
            } else {
                console.error('Etkinlik eklenemedi');
            }
        } catch (err) {
            console.error('Etkinlik ekleme hatası:', err);
        }

    };

    return (
        <div className="events-container">
            <div className="events-header">
                <h1>Etkinliklerim</h1>
            </div>

            <form className="event-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Etkinlik Başlığı"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Etkinlik Açıklaması"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                ></textarea>
                <input
                    type="datetime-local"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                />
                <button type="submit">Etkinlik Ekle</button>
            </form>

            <div className="events-list">
                <h2>Etkinlikler</h2>
                {events.map((events, index) => (
                    <div key={index} className="event-item">
                        <h3>{events.eventName}</h3>
                        <p>{events.description}</p>
                        <small>{new Date(events.dateTime).toLocaleString()}</small>
                        <div className="button-container">
                            <button className="delete-button" onClick={() => handleDelete(events.eventsId)}>
                                Sil
                            </button>
                            <button className="edit-button" onClick={() => handleEdit(events.eventsId)}>
                                Düzenle
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Etkinlikler;
