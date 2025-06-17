import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faEnvelope,
    faCalendarAlt,
    faMapMarkerAlt,
    faClock,
    faUsers,
    faArrowLeft,
    faExclamationCircle,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './JoinForm.css';

const JoinForm = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [eventDetails, setEventDetails] = useState(null);
    const [userCredit, setUserCredit] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7120/api/homepage/event/${eventId}`);
                if (!response.ok) throw new Error('Etkinlik bilgileri alınamadı');
                const data = await response.json();
                setEventDetails(data);
            } catch (err) {
                setError('Etkinlik bilgileri yüklenirken bir hata oluştu');
                console.error(err);
            }
        };

        const fetchUserCredit = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setError('Oturum açmanız gerekmektedir');
                    return;
                }

                const response = await fetch('https://localhost:7120/api/user/credit', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Kredi bilgisi alınamadı');
                const data = await response.json();
                setUserCredit(data.credit);
            } catch (err) {
                console.error('Kredi bilgisi alınırken hata:', err);
                setError('Kredi bilgisi alınamadı');
            }
        };

        fetchEventDetails();
        fetchUserCredit();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Kredi kontrolü
            if (eventDetails.credit > userCredit) {
                setError(`Bu etkinliğe katılmak için yeterli krediniz bulunmamaktadır. 
                         Gerekli kredi: ${eventDetails.credit}, 
                         Mevcut krediniz: ${userCredit}`);
                setLoading(false);
                return;
            }

            const response = await fetch('https://localhost:7120/api/eventparticipant/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    eventId: parseInt(eventId),
                    name: formData.name,
                    email: formData.email
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Bir hata oluştu');
            }

            setMessage('Etkinliğe başarıyla katıldınız!');
            setFormData({ name: '', email: '' });
            
            setTimeout(() => {
                navigate('/AllEvents');
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (error && !eventDetails) {
        return (
            <div className="join-form-container">
                <div className="error-message">
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
                    <p>{error}</p>
                    <button onClick={() => navigate('/AllEvents')} className="back-button">
                        <FontAwesomeIcon icon={faArrowLeft} /> Etkinliklere Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="join-form-container">
            <div className="join-form-card">
                <button onClick={() => navigate('/AllEvents')} className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} /> Etkinliklere Dön
                </button>

                {eventDetails && (
                    <div className="event-summary">
                        <h2>{eventDetails.eventName}</h2>
                        <div className="event-details">
                            <div className="detail-item">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <span>{new Date(eventDetails.dateTime).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div className="detail-item">
                                <FontAwesomeIcon icon={faClock} />
                                <span>{new Date(eventDetails.dateTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="detail-item">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <span>{eventDetails.location}</span>
                            </div>
                            <div className="detail-item">
                                <FontAwesomeIcon icon={faUsers} />
                                <span>{eventDetails.currentParticipants}/{eventDetails.capacity} Katılımcı</span>
                            </div>
                            <div className="detail-item credit-info">
                                <FontAwesomeIcon icon={faClock} />
                                <span>Gereken Kredi: {eventDetails.credit}</span>
                            </div>
                            <div className="detail-item credit-info">
                                <FontAwesomeIcon icon={faClock} />
                                <span>Mevcut Krediniz: {userCredit}</span>
                            </div>
                        </div>

                        {eventDetails.credit > userCredit && (
                            <div className="credit-warning">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Bu etkinliğe katılmak için yeterli krediniz bulunmamaktadır.</p>
                                <p>Gereken Kredi: {eventDetails.credit}</p>
                                <p>Mevcut Krediniz: {userCredit}</p>
                            </div>
                        )}

                        <div className="event-progress">
                            <div 
                                className="progress-bar"
                                style={{ width: `${(eventDetails.currentParticipants / eventDetails.capacity) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {message && (
                    <div className="success-message">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <p>{message}</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <p>{error}</p>
                    </div>
                )}

                {!message && eventDetails && eventDetails.credit <= userCredit && (
                    <form onSubmit={handleSubmit} className="join-form">
                        <h3>Etkinliğe Katıl</h3>
                        
                        <div className="form-group">
                            <label htmlFor="name">
                                <FontAwesomeIcon icon={faUser} />
                                <span>Adınız Soyadınız</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Adınızı ve soyadınızı girin"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>E-posta Adresiniz</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="E-posta adresinizi girin"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Kaydediliyor...
                                </>
                            ) : (
                                'Etkinliğe Katıl'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default JoinForm;
