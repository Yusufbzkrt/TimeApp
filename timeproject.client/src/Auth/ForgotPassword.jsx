import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // src/Auth/ForgotPassword.jsx
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            console.log('Þifre sýfýrlama isteði gönderiliyor...');
            const response = await fetch('https://localhost:7120/api/Auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            console.log('Sunucu yanýtý:', response.status);
            const data = await response.json();
            console.log('Sunucu yanýt verisi:', data);

            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.message || data.details || 'Bir hata oluþtu');
            }
        } catch (err) {
            console.error('Þifre sýfýrlama hatasý:', err);
            setError('Sunucuya baðlanýrken bir hata oluþtu. Lütfen daha sonra tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <h2>Þifremi Unuttum</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Adresiniz</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Gönderiliyor...' : 'Þifre Sýfýrlama Baðlantýsý Gönder'}
                    </button>
                </form>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
                <div className="footer">
                    <a href="/login">Giriþ sayfasýna dön</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;