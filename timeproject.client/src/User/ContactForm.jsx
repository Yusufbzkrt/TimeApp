import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPaperPlane,
    faUser,
    faEnvelope,
    faPhone,
    faMessage,
    faSpinner,
    faHome
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "./ContactForm.css";

const ContactForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://localhost:7120/api/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setSuccess(true);
                setForm({ name: '', email: '', phone: '', message: '' });
            } else {
                const data = await res.json();
                throw new Error(data.message || 'Bir hata oluştu');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-content">
                <div className="contact-header">
                    <h1>İletişim Formu</h1>
                    <p>Bizimle iletişime geçmek için aşağıdaki formu doldurabilirsiniz.</p>
                </div>

                {success ? (
                    <div className="success-message">
                        <FontAwesomeIcon icon={faPaperPlane} className="success-icon" />
                        <h2>Mesajınız Gönderildi!</h2>
                        <p>En kısa sürede size dönüş yapacağız.</p>
                        <div className="success-buttons">
                            <button 
                                className="new-message-button"
                                onClick={() => setSuccess(false)}
                            >
                                Yeni Mesaj Gönder
                            </button>
                            <button 
                                className="home-button"
                                onClick={() => navigate('/')}
                            >
                                <FontAwesomeIcon icon={faHome} />
                                <span>Anasayfaya Dön</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">
                                <FontAwesomeIcon icon={faUser} />
                                <span>Ad Soyad</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={form.name}
                                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                required
                                placeholder="Adınız ve soyadınız"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>E-posta</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={form.email}
                                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                                required
                                placeholder="ornek@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">
                                <FontAwesomeIcon icon={faPhone} />
                                <span>Telefon</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={form.phone}
                                onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                                required
                                placeholder="05XX XXX XX XX"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">
                                <FontAwesomeIcon icon={faMessage} />
                                <span>Mesajınız</span>
                            </label>
                            <textarea
                                id="message"
                                value={form.message}
                                onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                                required
                                placeholder="Mesajınızı buraya yazın..."
                                rows="5"
                            ></textarea>
                        </div>

                        {error && (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="form-buttons">
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                        <span>Gönderiliyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        <span>Gönder</span>
                                    </>
                                )}
                            </button>
                            <button 
                                type="button" 
                                className="home-button"
                                    onClick={() => navigate('/user/home')}
                            >
                                <FontAwesomeIcon icon={faHome} />
                                <span>Anasayfaya Dön</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactForm;
