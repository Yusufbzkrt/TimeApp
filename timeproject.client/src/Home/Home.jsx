import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <div className="header-content">
                    <h1 className="header-title">Zamanınızı Yönetin, Hayatınızı Kolaylaştırın</h1>
                    <p className="header-subtitle">Modern ve kullanıcı dostu zaman yönetim uygulaması ile işlerinizi daha verimli hale getirin.</p>
                    <div className="header-buttons">
                        <Link to="/login" className="header-button primary-button">Giriş Yap</Link>
                        <Link to="/register" className="header-button secondary-button">Kayıt Ol</Link>
                    </div>
                </div>
            </header>
            // ... existing code ...
        </div>
    );
};

export default Home; 