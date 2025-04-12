import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';

const MessageList = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        // SignalR baðlantýsýný kur
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/messageHub") // SignalR Hub URL
            .build();

        // Mesaj alýndýðýnda yapýlacak iþlemler
        newConnection.on("ReceiveMessage", (user, message) => {
            console.log(user, message); // Konsola mesajý yazdýr
            setMessages((prevMessages) => [
                ...prevMessages,
                { user, message }
            ]); // Mesajý state'e ekle
        });

        // Baðlantýyý baþlat
        newConnection
            .start()
            .then(() => console.log("SignalR Connected"))
            .catch((err) => console.error("SignalR Connection Error: ", err));

        setConnection(newConnection);

        // Temizleme iþlemi: Component unmount olduðunda baðlantýyý sonlandýr
        return () => {
            newConnection.stop().catch((err) => console.error(err));
        };

    }, []);

    useEffect(() => {
        // Mesajlarý backend'den çekmek
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/messages/${userId}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Mesajlar alýnamadý: ", error);
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
