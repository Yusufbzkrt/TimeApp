import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faTasks, faUser, faBell, faCog, faSignOutAlt, faHome, faChartLine, faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import "./UserHomePage.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserHomePage = () => {

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Hoşgeldiniz",
            message: "Zaman yönetim uygulamasına hoşgeldiniz.",
            time: "10:00",
            unread: true,
        },
    ]);

    const clearNotifications = () => {
        setNotifications([]);
    };
    return (
        <div className="user-home-container">
            {/* Main Content */}
            <div className="main-content">
                <header className="user-header">
                    <div className="header-content">
                        <div className="header-welcome" style={{ color: '#ffffff' }}>
                            <h1 style={{ color: '#ffffff' }}>Hoş Geldiniz!</h1>
                            <p style={{ color: '#ffffff' }}>Zaman yönetim uygulamanızda günlük aktivitelerinizi planlayın ve takip edin.</p>
                        </div>
                        <div className="header-stats">
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FontAwesomeIcon icon={faClock} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Toplam Zaman</span>
                                    <h3>24 Saat</h3>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FontAwesomeIcon icon={faTasks} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Tamamlanan Görevler</span>
                                    <h3>12</h3>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FontAwesomeIcon icon={faChartLine} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Verimlilik</span>
                                    <h3>85%</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="content-wrapper">
                    <section className="quick-actions">
                        <h2>Hızlı Erişim</h2>
                        <div className="action-grid">
                            <Link to="/user/etkinlikler" className="action-card">
                                <i className="fas fa-calendar-plus"></i>
                                <span>Etkinlik Ekle</span>
                            </Link>
                            <Link to="/user/task" className="action-card">
                                <i className="fas fa-tasks"></i>
                                <span>Görevler</span>
                            </Link>
                            <Link to="/notes" className="action-card">
                                <i className="fas fa-sticky-note"></i>
                                <span>Notlar</span>
                            </Link>
                            <Link to="/user/ayarlar" className="action-card">
                                <i className="fas fa-cog"></i>
                                <span>Ayarlar</span>
                            </Link>
                        </div>
                    </section>

                    <section className="recent-activities">
                        <h2>Son Aktiviteler</h2>
                        <div className="activity-list">
                            <div className="activity-item">
                                <i className="fas fa-check-circle"></i>
                                <div className="activity-content">
                                    <h3>Toplantı Tamamlandı</h3>
                                    <p>Proje değerlendirme toplantısı</p>
                                    <span className="activity-time">2 saat önce</span>
                                </div>
                            </div>
                            <div className="activity-item">
                                <i className="fas fa-calendar-check"></i>
                                <div className="activity-content">
                                    <h3>Yeni Etkinlik Eklendi</h3>
                                    <p>Haftalık ekip toplantısı</p>
                                    <span className="activity-time">4 saat önce</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Notification Panel */}
            <div className="notification-panel">
                <div className="notification-header">
                    <h3>Bildirimler</h3>
                    <button onClick={clearNotifications} className="notification-clear">Tümünü Temizle</button>
                </div>
                <div className="notification-list">
                    {notifications.length === 0 ? (
                        <p>Bildirim yok</p>
                    ) : (
                        notifications.map(n => (
                            <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                                <FontAwesomeIcon icon={faEnvelope} className="notification-icon" />
                                <div className="notification-content">
                                    <h4>{n.title}</h4>
                                    <p>{n.message}</p>
                                    <span className="notification-time">{n.time}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserHomePage;
