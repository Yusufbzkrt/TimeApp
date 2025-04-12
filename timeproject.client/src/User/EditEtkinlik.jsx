import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Etkinlikler.css';

const EditEtkinlik = () => {
    const { eventsId } = useParams(); // Etkinlik ID'sini URL'den alýyoruz
    const [form, setForm] = useState({ title: '', description: '', date: '' });
    const navigate = useNavigate();

    // Etkinliði API'den al
    const fetchEvent = async () => {
        try {
            const res = await fetch(`https://localhost:7120/api/Events/GetEvents`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (!res.ok) {
                throw new Error(`API Hata: ${res.status}`);
            }

            const data = await res.json();
            console.log('API yanýtý:', data); 
            setForm({
                title: data.eventName,
                description: data.description,
                date: new Date(data.dateTime).toISOString().slice(0, 16), // Date format adjustment
            });
        } catch (err) {
            console.error('Etkinlik yüklenirken hata:', err);
        }
    };

    // Etkinlik güncelleme iþlemi
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://localhost:7120/api/Events/${eventsId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({
                    EventName: form.title,
                    Description: form.description,
                    DateTime: form.date,
                    CreatedByUserID: 1,  // Bu kullanýcý ID'si dinamik olabilir, burada sabit kullanýldý
                }),
            });

            if (res.ok) {
                alert('Etkinlik baþarýyla güncellendi');
                navigate('/user/etkinlikler'); // Baþarýyla güncellendikten sonra etkinlikler sayfasýna yönlendir
            } else {
                alert('Etkinlik güncellenemedi');
            }
        } catch (err) {
            console.error('Güncelleme hatasý:', err);
            alert('Bir hata oluþtu');
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [eventsId]);

    return (
        <div className="events-container">
            <div className="events-header">
                <h1>Etkinlik Düzenle</h1>
            </div>

            <form className="event-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Etkinlik Baþlýðý"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Etkinlik Açýklamasý"
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
                <button type="submit">Etkinliði Güncelle</button>
            </form>
        </div>
    );
};

export default EditEtkinlik;
