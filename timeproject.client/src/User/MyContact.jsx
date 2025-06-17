import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faEnvelope, 
    faPhone, 
    faEdit, 
    faCamera,
    faSpinner,
    faCoins,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import './MyContact.css';

const MyContact = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            window.location.href = '/login';
            return;
        }
        fetch('https://localhost:7120/api/User/MyContact', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserInfo(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setLoading(false);
            });
    }, []);

    const handleEditClick = () => {
        navigate('/MyContactEdit'); 
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className="error-container">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
                <p>Bilgiler yüklenemedi</p>
            </div>
        );
    }

    return (
        <div className="my-contact-container">
            <div className="my-contact-header">
                <h2>Profil Bilgilerim</h2>
            </div>
            <div className="my-contact-content">
                <div className="profile-image-container">
                    {userInfo.avatar ? (
                        <img
                            src={`https://localhost:7120${userInfo.avatar}`}
                            alt="Profile"
                            className="profile-image"
                        />
                    ) : (
                        <div className="profile-image-placeholder">
                            <FontAwesomeIcon icon={faUser} size="3x" />
                        </div>
                    )}
                </div>

                <div className="my-contact-info">
                    <div className="info-item">
                        <FontAwesomeIcon icon={faUser} className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Ad Soyad</span>
                            <span className="info-value">{userInfo.name} {userInfo.surname}</span>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">E-posta</span>
                            <span className="info-value">{userInfo.email}</span>
                        </div>
                    </div>

                    <div className="info-item">
                        <FontAwesomeIcon icon={faPhone} className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Telefon</span>
                            <span className="info-value">{userInfo.phoneNumber}</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faCoins} className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Kalan kredi miktarı</span>
                            <span className="info-value">{userInfo.credit}</span>
                        </div>
                    </div>
                </div>

                <button className="edit-button" onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faEdit} /> Bilgileri Düzenle
                </button>
            </div>
        </div>
    );
};

export default MyContact;
