import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Etkinlikler.css';

const EditEtkinlik = () => {
    const { eventsId } = useParams(); // Etkinlik ID'sini URL'den al�yoruz
    const [form, setForm] = useState({ title: '', description: '', date: '' });
    const navigate = useNavigate();

    // Etkinli�i API'den al
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
            console.log('API yan�t�:', data); 
            setForm({
                title: data.eventName,
                description: data.description,
                date: new Date(data.dateTime).toISOString().slice(0, 16), // Date format adjustment
            });
        } catch (err) {
            console.error('Etkinlik y�klenirken hata:', err);
        }
    };

    // Etkinlik g�ncelleme i�lemi
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
                    CreatedByUserID: 1,  // Bu kullan�c� ID'si dinamik olabilir, burada sabit kullan�ld�
                }),
            });

            if (res.ok) {
                alert('Etkinlik ba�ar�yla g�ncellendi');
                navigate('/user/etkinlikler'); // Ba�ar�yla g�ncellendikten sonra etkinlikler sayfas�na y�nlendir
            } else {
                alert('Etkinlik g�ncellenemedi');
            }
        } catch (err) {
            console.error('G�ncelleme hatas�:', err);
            alert('Bir hata olu�tu');
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [eventsId]);

    return (
        <div className="events-container">
            <div className="events-header">
                <h1>Etkinlik D�zenle</h1>
            </div>

            <form className="event-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Etkinlik Ba�l���"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Etkinlik A��klamas�"
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
                <button type="submit">Etkinli�i G�ncelle</button>
            </form>
        </div>
    );
};

export default EditEtkinlik;
