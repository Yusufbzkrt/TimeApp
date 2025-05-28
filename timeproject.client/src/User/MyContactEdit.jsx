import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faEnvelope, 
    faPhone, 
    faCamera, 
    faSpinner,
    faExclamationCircle,
    faSave,
    faTimes,
    faUpload
} from '@fortawesome/free-solid-svg-icons';
import './MyContactEdit.css';

const MyContactEdit = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        avatar: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
                    if (data.avatar) {
                        setImagePreview(`https://localhost:7120${data.avatar}`);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    setError('Veri alınırken bir hata oluştu.');
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
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Token bulunamadı, giriş yapmanız gerekiyor.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('name', userInfo.name);
        formData.append('surname', userInfo.surname);
        formData.append('email', userInfo.email);
        formData.append('phoneNumber', userInfo.phoneNumber);
        if (file) {
            formData.append('avatar', file);
        }

        fetch('https://localhost:7120/api/User/MyContactEdit', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                    navigate('/user/iletisim');
                } else {
                    setError('Bilgiler güncellenemedi.');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Hata:', error);
                setError('Bir hata oluştu.');
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="my-contact-edit-container">
            <div className="my-contact-edit-header">
                <h2>Profil Bilgilerini Düzenle</h2>
            </div>
            <form onSubmit={handleSubmit} className="my-contact-edit-form">
                <div className="profile-image-edit">
                    <div className="profile-image-container">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Profile Preview"
                                className="profile-image"
                            />
                        ) : (
                            <div className="profile-image-placeholder">
                                <FontAwesomeIcon icon={faUser} size="3x" />
                            </div>
                        )}
                    </div>
                    <div className="image-upload-container">
                        <label htmlFor="imageUpload" className="image-upload-label">
                            <FontAwesomeIcon icon={faUpload} />
                            <span>Profil Resmi Yükle</span>
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="image-upload-input"
                        />
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faUser} />
                            <span>Ad</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            placeholder="Adınızı girin"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faUser} />
                            <span>Soyad</span>
                        </label>
                        <input
                            type="text"
                            name="surname"
                            value={userInfo.surname}
                            onChange={handleChange}
                            placeholder="Soyadınızı girin"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>E-posta</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            placeholder="E-posta adresinizi girin"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>Telefon</span>
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={userInfo.phoneNumber}
                            onChange={handleChange}
                            placeholder="Telefon numaranızı girin"
                            required
                        />
                    </div>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="save-button" >
                        <FontAwesomeIcon icon={faSave} />
                        <span>Kaydet</span>
                    </button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/user/iletisim')}>
                        <FontAwesomeIcon icon={faTimes} />
                        <span>İptal</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyContactEdit;
