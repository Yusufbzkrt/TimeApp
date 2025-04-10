import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyContactEdit.css';

const MyContactEdit = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        imageUrl: "",
    });
    const [loading, setLoading] = useState(true); // Yükleniyor durumunu takip edelim
    const [error, setError] = useState(null); // Hata durumunu kontrol edelim
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        // Kullanýcý bilgilerini yükleme
        const token = localStorage.getItem('authToken');

        if (token) {
            fetch('https://localhost:7120/api/User/MyContact', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserInfo(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError('Veri alýnýrken bir hata oluþtu.');
                    setLoading(false);
                });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Seçilen dosyayý state'e kaydediyoruz
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Token bulunamadý, giriþ yapmanýz gerekiyor.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('name', userInfo.name);
        formData.append('surname', userInfo.surname);
        formData.append('email', userInfo.email);
        formData.append('phoneNumber', userInfo.phoneNumber);
        if (file) {
            formData.append('ImageUrl', file); // Resmi FormData'ya ekliyoruz
        }

        fetch('https://localhost:7120/api/User/MyContactEdit', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // FormData'yý gönderiyoruz
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message); // Baþarý mesajýný göster
                    navigate('/MyContact');
                } else {
                    setError('Bilgiler güncellenemedi.');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Hata:', error);
                setError('Bir hata oluþtu.');
                setLoading(false);
            });
    };




    if (loading) {
        return <div className="loading-spinner">Yükleniyor...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="my-contact-container">
            <h2 className="my-contact-header">Bilgileri Düzenle</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-contact-info">

                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        placeholder="Ad"
                    />
                    <input
                        type="text"
                        name="surname"
                        value={userInfo.surname}
                        onChange={handleChange}
                        placeholder="Soyad"
                    />
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                        placeholder="Telefon"
                    />
                    <div className="image-upload">
                        <label htmlFor="imageUpload">Profil Resmi Yükle:</label>
                        <input
                            type="file"
                            id="imageUpload"
                            onChange={handleFileChange}
                        />
                        {userInfo.imageUrl && (
                            <div className="image-preview">
                                <img
                                    src={`https://localhost:7120${userInfo.imageUrl}`}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <button type="submit" className="submit-button">Güncelle</button>
            </form>
        </div>
    );
};

export default MyContactEdit;
