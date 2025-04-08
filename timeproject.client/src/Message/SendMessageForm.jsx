import React, { useState } from "react";
import axios from "axios";

const SendMessageForm = ({ senderId, receiverId }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMessage = {
            senderId,
            receiverId,
            content: message,
        };

        await axios.post("/api/messages", newMessage);
        setMessage(""); // Formu temizle
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajýnýzý yazýn..."
            />
            <button type="submit">Gönder</button>
        </form>
    );
};

export default SendMessageForm;
