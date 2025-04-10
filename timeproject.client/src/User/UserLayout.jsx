import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './UserLayout.css';

const UserLayout = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    };

    return (
        <div className="user-layout">
            <nav className="navbar">
                <ul>
                    <li><Link to="/user/home"><i className="fas fa-home"></i> Anasayfa</Link></li>
                    <li><Link to="/user/etkinlikler"><i className="fas fa-calendar-alt"></i> Etkinliklerim</Link></li>
                    <li><Link to="/user/iletisim"><i className="fas fa-envelope"></i> İletişim</Link></li>
                    <li><Link to="/user/yardim"><i className="fas fa-question-circle"></i> Yardım</Link></li>
                    <li><Link to="/user/blog"><i className="fas fa-blog"></i> Bloglarım</Link></li>
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