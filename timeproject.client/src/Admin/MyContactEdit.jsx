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
    const [loading, setLoading] = useState(true); // Y�kleniyor durumunu takip edelim
    const [error, setError] = useState(null); // Hata durumunu kontrol edelim
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        // Kullan�c� bilgilerini y�kleme
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
                    setError('Veri al�n�rken bir hata olu�tu.');
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
        setFile(e.target.files[0]); // Se�ilen dosyay� state'e kaydediyoruz
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Token bulunamad�, giri� yapman�z gerekiyor.');
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
            body: formData, // FormData'y� g�nderiyoruz
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message); // Ba�ar� mesaj�n� g�ster
                    navigate('/MyContact');
                } else {
                    setError('Bilgiler g�ncellenemedi.');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Hata:', error);
                setError('Bir hata olu�tu.');
                setLoading(false);
            });
    };




    if (loading) {
        return <div className="loading-spinner">Y�kleniyor...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="my-contact-container">
            <h2 className="my-contact-header">Bilgileri D�zenle</h2>
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
                        <label htmlFor="imageUpload">Profil Resmi Y�kle:</label>
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
                <button type="submit" className="submit-button">G�ncelle</button>
            </form>
        </div>
    );
};

export default MyContactEdit;
