import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSun, 
    faMoon, 
    faBell, 
    faLanguage, 
    faUser, 
    faPalette,
    faVolumeUp,
    faVolumeMute,
    faSave,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import './Ayarlar.css';

const Ayarlar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: true,
            sound: true
        },
        language: 'tr',
        fontSize: 'medium',
        soundEnabled: true,
        autoSave: true
    });

    const [saveStatus, setSaveStatus] = useState('');

    const handleNotificationChange = (type) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [type]: !prev.notifications[type]
            }
        }));
    };

    const handleLanguageChange = (lang) => {
        setSettings(prev => ({
            ...prev,
            language: lang
        }));
    };

    const handleFontSizeChange = (size) => {
        setSettings(prev => ({
            ...prev,
            fontSize: size
        }));
    };

    const handleSoundToggle = () => {
        setSettings(prev => ({
            ...prev,
            soundEnabled: !prev.soundEnabled
        }));
    };

    const handleAutoSaveToggle = () => {
        setSettings(prev => ({
            ...prev,
            autoSave: !prev.autoSave
        }));
    };

    const saveSettings = () => {
        // Burada ayarları localStorage'a kaydedebilir veya API'ye gönderebilirsiniz
        localStorage.setItem('userSettings', JSON.stringify(settings));
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(''), 2000);
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Ayarlar</h1>
                <p>Hesap ve uygulama tercihlerinizi buradan yönetebilirsiniz</p>
            </div>

            <div className="settings-content">
                <div className="settings-section">
                    <div className="section-header">
                        <FontAwesomeIcon icon={faPalette} className="section-icon" />
                        <h2>Görünüm</h2>
                    </div>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Tema</h3>
                                <p>Koyu veya açık tema seçin</p>
                            </div>
                            <div className="theme-toggle">
                                <button 
                                    className={`theme-btn ${!isDarkMode ? 'active' : ''}`}
                                    onClick={() => !isDarkMode && toggleTheme()}
                                >
                                    <FontAwesomeIcon icon={faSun} />
                                    <span>Açık</span>
                                </button>
                                <button 
                                    className={`theme-btn ${isDarkMode ? 'active' : ''}`}
                                    onClick={() => isDarkMode && toggleTheme()}
                                >
                                    <FontAwesomeIcon icon={faMoon} />
                                    <span>Koyu</span>
                                </button>
                            </div>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Yazı Boyutu</h3>
                                <p>Metin boyutunu ayarlayın</p>
                            </div>
                            <div className="font-size-selector">
                                {['small', 'medium', 'large'].map(size => (
                                    <button
                                        key={size}
                                        className={`font-size-btn ${settings.fontSize === size ? 'active' : ''}`}
                                        onClick={() => handleFontSizeChange(size)}
                                    >
                                        {size === 'small' ? 'A' : size === 'medium' ? 'A' : 'A'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <div className="section-header">
                        <FontAwesomeIcon icon={faBell} className="section-icon" />
                        <h2>Bildirimler</h2>
                    </div>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>E-posta Bildirimleri</h3>
                                <p>Önemli güncellemeler için e-posta alın</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications.email}
                                    onChange={() => handleNotificationChange('email')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Push Bildirimleri</h3>
                                <p>Anlık bildirimler alın</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications.push}
                                    onChange={() => handleNotificationChange('push')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Ses Bildirimleri</h3>
                                <p>Bildirim seslerini açın/kapatın</p>
                            </div>
                            <button 
                                className="sound-toggle"
                                onClick={handleSoundToggle}
                            >
                                <FontAwesomeIcon icon={settings.soundEnabled ? faVolumeUp : faVolumeMute} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <div className="section-header">
                        <FontAwesomeIcon icon={faLanguage} className="section-icon" />
                        <h2>Dil ve Bölge</h2>
                    </div>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Dil Seçimi</h3>
                                <p>Uygulama dilini değiştirin</p>
                            </div>
                            <div className="language-selector">
                                <button
                                    className={`lang-btn ${settings.language === 'tr' ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange('tr')}
                                >
                                    Türkçe
                                </button>
                                <button
                                    className={`lang-btn ${settings.language === 'en' ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange('en')}
                                >
                                    English
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <div className="section-header">
                        <FontAwesomeIcon icon={faUser} className="section-icon" />
                        <h2>Profil Tercihleri</h2>
                    </div>
                    <div className="settings-grid">
                        <div className="setting-item">
                            <div className="setting-info">
                                <h3>Otomatik Kaydet</h3>
                                <p>Değişiklikleri otomatik kaydet</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={settings.autoSave}
                                    onChange={handleAutoSaveToggle}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="settings-actions">
                    <button 
                        className="save-button"
                        onClick={saveSettings}
                    >
                        {saveStatus === 'success' ? (
                            <>
                                <FontAwesomeIcon icon={faCheck} />
                                <span>Kaydedildi</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faSave} />
                                <span>Değişiklikleri Kaydet</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ayarlar; 