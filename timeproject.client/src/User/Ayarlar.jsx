import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faFont, faBell, faLanguage } from '@fortawesome/free-solid-svg-icons';
import './Ayarlar.css';

const Ayarlar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState('medium');
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('tr');
    const [settings, setSettings] = useState({
        theme: 'light',
        fontSize: 'medium',
        notifications: true,
        language: 'tr'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Kullanıcı ayarlarını getir
    const fetchUserSettings = async () => {
        try {
            const response = await fetch('https://localhost:7120/api/Settings', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                }
            });
            
            if (!response.ok) {
                throw new Error('Ayarlar yüklenirken bir hata oluştu');
            }

            const data = await response.json();
            setSettings(data);
        } catch (err) {
            setError(err.message);
            console.error('Ayarlar yüklenirken hata:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserSettings();
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
        // Yazı boyutunu uygula
        document.body.className = `font-size-${size}`;
    };

    const handleNotificationChange = (enabled) => {
        setNotifications(enabled);
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    const saveSettingsToBackend = async (newSettings) => {
        try {
            const response = await fetch('https://localhost:7120/api/Settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(newSettings)
            });

            if (!response.ok) {
                throw new Error('Ayarlar kaydedilirken bir hata oluştu');
            }

            setSettings(newSettings);
        } catch (err) {
            setError(err.message);
            console.error('Ayarlar kaydedilirken hata:', err);
        }
    };

    const handleThemeChange = async () => {
        const newTheme = !isDarkMode;
        toggleTheme();
        
        const newSettings = {
            ...settings,
            theme: newTheme ? 'dark' : 'light'
        };
        setSettings(newSettings);
        await saveSettingsToBackend(newSettings);
    };

    if (isLoading) {
        return <div className="loading">Yükleniyor...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="settings-container">
            <h2>Ayarlar</h2>
            
            <div className="settings-section">
                <h3>
                    <FontAwesomeIcon icon={faSun} /> Tema
                </h3>
                <div className="theme-buttons">
                    <button 
                        className={`theme-btn ${!isDarkMode ? 'active' : ''}`}
                        onClick={() => !isDarkMode && handleThemeChange()}
                    >
                        <FontAwesomeIcon icon={faSun} />
                        <span>Açık Tema</span>
                    </button>
                    <button 
                        className={`theme-btn ${isDarkMode ? 'active' : ''}`}
                        onClick={() => isDarkMode && handleThemeChange()}
                    >
                        <FontAwesomeIcon icon={faMoon} />
                        <span>Koyu Tema</span>
                    </button>
                </div>
            </div>

            <div className="settings-section">
                <h3>
                    <FontAwesomeIcon icon={faFont} /> Yazı Boyutu
                </h3>
                <div className="font-size-buttons">
                    <button 
                        className={`font-size-btn ${fontSize === 'small' ? 'active' : ''}`}
                        onClick={() => handleFontSizeChange('small')}
                    >
                        Küçük
                    </button>
                    <button 
                        className={`font-size-btn ${fontSize === 'medium' ? 'active' : ''}`}
                        onClick={() => handleFontSizeChange('medium')}
                    >
                        Orta
                    </button>
                    <button 
                        className={`font-size-btn ${fontSize === 'large' ? 'active' : ''}`}
                        onClick={() => handleFontSizeChange('large')}
                    >
                        Büyük
                    </button>
                </div>
            </div>

            <div className="settings-section">
                <h3>
                    <FontAwesomeIcon icon={faBell} /> Bildirimler
                </h3>
                <div className="notification-toggle">
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={notifications}
                            onChange={(e) => handleNotificationChange(e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                    <span>Bildirimleri {notifications ? 'Açık' : 'Kapalı'}</span>
                </div>
            </div>

            <div className="settings-section">
                <h3>
                    <FontAwesomeIcon icon={faLanguage} /> Dil
                </h3>
                <div className="language-buttons">
                    <button 
                        className={`language-btn ${language === 'tr' ? 'active' : ''}`}
                        onClick={() => handleLanguageChange('tr')}
                    >
                        Türkçe
                    </button>
                    <button 
                        className={`language-btn ${language === 'en' ? 'active' : ''}`}
                        onClick={() => handleLanguageChange('en')}
                    >
                        English
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ayarlar; 