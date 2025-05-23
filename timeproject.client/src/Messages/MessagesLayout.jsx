import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './MessageLayout.css';

const MessageLayout = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    };

    return (
        <div className="message-layout">
            <nav className="navbar">
                <ul>
                    <li><Link to="/user/home"><i className="fas fa-home"></i> Anasayfa</Link></li>
                    <li><Link to="/user/etkinlikler"><i className="fas fa-calendar-alt"></i> Etkinliklerim</Link></li>
                    <li><Link to="/user/iletisim"><i className="fas fa-envelope"></i> �leti�im</Link></li>
                    <li><Link to="/user/yardim"><i className="fas fa-question-circle"></i> Yard�m</Link></li>
                    <li><Link to="/user/blog"><i className="fas fa-blog"></i> Bloglar�m</Link></li>
                    <li><Link to="/chat"><i className="fas fa-message"></i> Mesajlar�m</Link></li>
                    <li className="logout">
                        <button onClick={handleLogout} className="logout-button">
                            <i className="fas fa-sign-out-alt"></i> ��k�� Yap
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="message-content">
                <Outlet />
            </main>

            <footer className="message-footer">
                <p>&copy; 2024 Time Bank. T�m Haklar� Sakl�d�r.</p>
            </footer>
        </div>
    );
};

export default MessageLayout; 