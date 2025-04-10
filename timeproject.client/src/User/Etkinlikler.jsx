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
            const res = await fetch('https://localhost:7120/api/User/GetEvents');
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error('Etkinlikler çekilirken hata:', err);
        }
    };

    // Sayfa yüklendiğinde etkinlikleri getir
    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        if (!eventId) {
            alert('Geçersiz etkinlik ID');
            return;
        }

        try {
            const res = await fetch(`https://localhost:7120/api/User/EventDelete/${eventId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                fetchEvents();
                alert(data.message);
            } else {
                alert(data.message || 'Etkinlik silinirken bir hata oluştu.');
            }
        } catch (err) {
            console.error('Silme hatası:', err);
            alert('Bir hata oluştu.');
        }
    };

    // Güncelleme işlemi
    const handleEdit = (event) => {
        navigate(`/user/etkinlikler/duzenle/${event.eventId}`);
    };

    // Etkinlik ekle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://localhost:7120/api/User/EventAdd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
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
                {events.map((event, index) => (
                    <div key={index} className="event-item">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <small>{new Date(event.date).toLocaleString()}</small>
                        <div className="button-container">
                            <button className="delete-button" onClick={() => handleDelete(event.eventId)}>
                                Sil
                            </button>
                            <button className="edit-button" onClick={() => handleEdit(event)}>
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
