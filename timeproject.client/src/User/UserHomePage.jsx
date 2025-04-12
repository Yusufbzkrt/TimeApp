import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faTasks, faUser, faBell, faCog, faSignOutAlt, faHome, faChartLine, faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import "./UserHomePage.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserHomePage = () => {
    return (
        <div className="user-home-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3>Kullanıcı Paneli</h3>
                </div>
                <div className="sidebar-menu">
                    <Link to="/user" className="sidebar-item active">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Ana Sayfa</span>
                    </Link>
                    <Link to="/user/profile" className="sidebar-item">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Profil</span>
                    </Link>
                    <Link to="/user/calendar" className="sidebar-item">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>Takvim</span>
                    </Link>
                    <Link to="/user/tasks" className="sidebar-item">
                        <FontAwesomeIcon icon={faTasks} />
                        <span>Görevler</span>
                    </Link>
                    <Link to="/user/reports" className="sidebar-item">
                        <FontAwesomeIcon icon={faChartLine} />
                        <span>Raporlar</span>
                    </Link>
                    <Link to="/user/documents" className="sidebar-item">
                        <FontAwesomeIcon icon={faFileAlt} />
                        <span>Dokümanlar</span>
                    </Link>
                    <Link to="/user/settings" className="sidebar-item">
                        <FontAwesomeIcon icon={faCog} />
                        <span>Ayarlar</span>
                    </Link>
                    <Link to="/logout" className="sidebar-item">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Çıkış</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="user-header">
                    <div className="header-content">
                        <h1>Hoş Geldiniz!</h1>
                        <p>Zaman yönetim uygulamanızda günlük aktivitelerinizi planlayın ve takip edin.</p>
                        <div className="header-stats">
                            <div className="stat-item">
                                <i className="fas fa-clock"></i>
                                <span>Toplam Zaman</span>
                                <h3>24 Saat</h3>
                            </div>
                            <div className="stat-item">
                                <i className="fas fa-tasks"></i>
                                <span>Tamamlanan Görevler</span>
                                <h3>12</h3>
                            </div>
                            <div className="stat-item">
                                <i className="fas fa-star"></i>
                                <span>Verimlilik</span>
                                <h3>85%</h3>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="content-wrapper">
                    <section className="quick-actions">
                        <h2>Hızlı Erişim</h2>
                        <div className="action-grid">
                            <Link to="/events" className="action-card">
                                <i className="fas fa-calendar-plus"></i>
                                <span>Etkinlik Ekle</span>
                            </Link>
                            <Link to="/tasks" className="action-card">
                                <i className="fas fa-tasks"></i>
                                <span>Görevler</span>
                            </Link>
                            <Link to="/notes" className="action-card">
                                <i className="fas fa-sticky-note"></i>
                                <span>Notlar</span>
                            </Link>
                            <Link to="/settings" className="action-card">
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
                    <button className="notification-clear">Tümünü Temizle</button>
                </div>
                <div className="notification-list">
                    <div className="notification-item unread">
                        <FontAwesomeIcon icon={faBell} className="notification-icon" />
                        <div className="notification-content">
                            <h4>Yeni Görev Atandı</h4>
                            <p>Proje planlaması için yeni bir görev atandı.</p>
                            <span className="notification-time">2 saat önce</span>
                        </div>
                    </div>
                    <div className="notification-item">
                        <FontAwesomeIcon icon={faEnvelope} className="notification-icon" />
                        <div className="notification-content">
                            <h4>Yeni Mesaj</h4>
                            <p>Ahmet Bey'den yeni bir mesaj aldınız.</p>
                            <span className="notification-time">5 saat önce</span>
                        </div>
                    </div>
                    <div className="notification-item">
                        <FontAwesomeIcon icon={faCalendar} className="notification-icon" />
                        <div className="notification-content">
                            <h4>Toplantı Hatırlatması</h4>
                            <p>Yarın saat 14:00'te proje toplantısı var.</p>
                            <span className="notification-time">1 gün önce</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHomePage;
