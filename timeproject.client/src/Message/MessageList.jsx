import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';

const MessageList = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        // SignalR ba�lant�s�n� kur
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/messageHub") // SignalR Hub URL
            .build();

        // Mesaj al�nd���nda yap�lacak i�lemler
        newConnection.on("ReceiveMessage", (user, message) => {
            console.log(user, message); // Konsola mesaj� yazd�r
            setMessages((prevMessages) => [
                ...prevMessages,
                { user, message }
            ]); // Mesaj� state'e ekle
        });

        // Ba�lant�y� ba�lat
        newConnection
            .start()
            .then(() => console.log("SignalR Connected"))
            .catch((err) => console.error("SignalR Connection Error: ", err));

        setConnection(newConnection);

        // Temizleme i�lemi: Component unmount oldu�unda ba�lant�y� sonland�r
        return () => {
            newConnection.stop().catch((err) => console.error(err));
        };

    }, []);

    useEffect(() => {
        // Mesajlar� backend'den �ekmek
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/messages/${userId}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Mesajlar al�namad�: ", error);
            }
        };

        fetchMessages();
    }, [userId]);

    return (
        <div>
            <h3>Mesajlar</h3>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg?.user || 'Bilinmeyen'}:</strong> {msg?.message || 'Mesaj yok'}
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default MessageList;
