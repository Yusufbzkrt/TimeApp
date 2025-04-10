import React, { useEffect, useState } from "react";
import "./Etkinlikler.css";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({
        eventName: "",
        description: "",
        dateTime: "",
        createdByUserID: 1, 
        isActive: true,
    });

    const fetchEvents = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch('https://localhost:7120/api/User/GetEvents', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Eðer token gerekiyor ise
                    'Authorization': `Bearer ${yourToken}`,
                }
            });
            if (!response.ok) {
                throw new Error('Etkinlikler yüklenemedi');
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`https://localhost:7120/api/User/Events/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        await fetchEvents();
    };

    const handleDelete = async (id) => {
        await fetch(`/api/events/${id}`, {
            method: "DELETE",
        });
        await fetchEvents();
    };

    const handleUpdate = async (id) => {
        await fetch(`/api/events/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, eventsId: id }),
        });
        await fetchEvents();
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Etkinlik Ekle</h2>
            <form onSubmit={handleSubmit}>
                <input name="eventName" placeholder="Etkinlik Adý" onChange={handleChange} />
                <textarea name="description" placeholder="Açýklama" onChange={handleChange}></textarea>
                <input name="dateTime" type="datetime-local" onChange={handleChange} />
                <button type="submit">Ekle</button>
            </form>

            <h2>Etkinlikler</h2>
            {events.map((e) => (
                <div key={e.eventsId} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                    <h3>{e.eventName}</h3>
                    <p>{e.description}</p>
                    <p>{new Date(e.dateTime).toLocaleString()}</p>
                    {/* Video/Resim için alanlar eklenebilir */}
                    <button onClick={() => handleDelete(e.eventsId)}>Sil</button>
                    <button onClick={() => handleUpdate(e.eventsId)}>Güncelle</button>
                </div>
            ))}
        </div>
    );
};

export default EventPage;
