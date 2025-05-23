// src/components/Notifications/NotificationComponent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './NotificationComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faTasks, faCalendarAlt, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// NotificationContext'i import edin (birazdan oluþturacaðýz)
import { useNotification } from '../../contexts/NotificationContext'; // Yolunuza göre ayarlayýn

const NotificationComponent = () => {
    const { notifications, removeNotification, clearAllNotifications } = useNotification();
    const [showNotifications, setShowNotifications] = useState(false); // Bildirimleri açýp kapatmak için

    const getIcon = (type) => {
        switch (type) {
            case 'message':
                return faEnvelope;
            case 'task':
                return faTasks;
            case 'meeting':
                return faCalendarAlt;
            default:
                return faBell;
        }
    };

    return (
        <div className="notifications-wrapper">
            {/* Bildirim zili ikonu veya benzeri bir tetikleyici */}
            <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
                <FontAwesomeIcon icon={faBell} />
                {notifications.length > 0 && (
                    <span className="notification-count">{notifications.length}</span>
                )}
            </div>

            {showNotifications && (
                <div className="notifications-panel">
                    <div className="panel-header">
                        <h3>Bildirimler</h3>
                        <button onClick={clearAllNotifications} className="clear-all-button">
                            <FontAwesomeIcon icon={faTrashAlt} /> Tümünü Temizle
                        </button>
                    </div>
                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <p className="no-notifications">Henüz bildirim yok.</p>
                        ) : (
                            notifications.map(notification => (
                                <div key={notification.id} className="notification-item">
                                    <FontAwesomeIcon icon={getIcon(notification.type)} className="notification-icon" />
                                    <div className="notification-content">
                                        <p className="notification-title">{notification.title}</p>
                                        <p className="notification-message">{notification.message}</p>
                                        <span className="notification-time">{notification.time}</span>
                                    </div>
                                    <button
                                        onClick={() => removeNotification(notification.id)}
                                        className="notification-close-button"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationComponent;