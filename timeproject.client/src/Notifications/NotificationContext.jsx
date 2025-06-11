// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(() => {
        // LocalStorage'dan mevcut bildirimleri yükle
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });

    // Bildirimler deðiþtiðinde LocalStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = useCallback((newNotification) => {
        setNotifications(prevNotifications => {
            const notificationWithId = {
                id: Date.now() + Math.random(), // Benzersiz bir ID
                time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                ...newNotification,
            };
            // Eðer bildirim sayýsý çok artarsa eskileri temizleyebiliriz
            const updatedNotifications = [notificationWithId, ...prevNotifications];
            return updatedNotifications.slice(0, 20); // Son 20 bildirimi tut
        });
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prevNotifications =>
            prevNotifications.filter(notification => notification.id !== id)
        );
    }, []);

    const clearAllNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAllNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};