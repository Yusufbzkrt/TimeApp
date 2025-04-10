import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyContact.css';  // CSS dosyasını import edin

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
            <div className="loading-spinner">
                Yükleniyor...
            </div>
        );
    }

    if (!userInfo) {
        return <div className="error-message">Bilgiler yüklenemedi</div>;
    }

    return (
        <div className="my-contact-container">
            <div className="my-contact-header">
                <h2>Kullanıcı Bilgileri</h2>
            </div>
            <div className="my-contact-content">
                <div className="my-contact-info">
                    <div className="my-contact-info">
                        {userInfo.imageUrl && (() => {
                            const imageUrl = `https://localhost:7120${userInfo.imageUrl}`;
                            console.log("Resim URL:", imageUrl); // Konsola yazdır
                            return (
                                <img
                                    src={imageUrl}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            );
                        })()}
                    </div>


                    <p><strong>Ad:</strong> {userInfo.name} { }</p>
                    <p><strong>Soyad:</strong> {userInfo.surname}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Telefon:</strong> {userInfo.phoneNumber}</p>
                    
                </div>
                {/* Düzenle Butonu */}
                <button className="edit-button" onClick={handleEditClick}>
                    Düzenle
                </button>
            </div>
            <div className="my-contact-footer">
                <p>© 2025 MyCompany</p>
            </div>
        </div>
    );
};

export default MyContact;
