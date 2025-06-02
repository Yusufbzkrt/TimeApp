import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faTasks, faUser, faBell, faCog, faSignOutAlt, faHome, faChartLine, faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './UserLayout.css';

const UserLayout = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    };

    return (
        <div className="user-layout">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3>Kullanıcı Paneli</h3>
                </div>
                <div className="sidebar-menu">
                    <Link to="/user" className="sidebar-item active">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Ana Sayfa</span>
                    </Link>
                    <Link to="/user/iletisim" className="sidebar-item">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Profil</span>
                    </Link>
                    <Link to="/user/calendar" className="sidebar-item">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>Takvim</span>
                    </Link>
                    <Link to="/user/task" className="sidebar-item">
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
                    <Link to="/user/ayarlar" className="sidebar-item">
                        <FontAwesomeIcon icon={faCog} />
                        <span>Ayarlar</span>
                    </Link>
                    <Link to="/logout" className="sidebar-item" onClick={handleLogout} >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Çıkış</span>
                    </Link>
                </div>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to="/user/home"><i className="fas fa-home"></i> Anasayfa</Link></li>
                    <li><Link to="/user/etkinlikler"><i className="fas fa-calendar-alt"></i> Etkinliklerim</Link></li>
                    <li><Link to="/user/iletisim"><i className="fas fa-envelope"></i> İletişim</Link></li>
                    <li><Link to="/user/yardim"><i className="fas fa-question-circle"></i> Yardım</Link></li>
                    <li><Link to="/user/blog"><i className="fas fa-blog"></i> Bloglarım</Link></li>
                    <li><Link to="/chat"><i className="fas fa-message"></i> Mesajlarım</Link></li>
                    <li className="logout">
                        <button onClick={handleLogout} className="logout-button">
                            <i className="fas fa-sign-out-alt"></i> Çıkış Yap
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="user-content">
                <Outlet />
            </main>

            <footer className="user-footer">
                <p>&copy; 2024 Time Bank. Tüm Hakları Saklıdır.</p>
            </footer>
        </div>
    );
};

export default UserLayout; 