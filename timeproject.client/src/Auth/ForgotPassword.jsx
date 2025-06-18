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
            console.log('�ifre s�f�rlama iste�i g�nderiliyor...');
            const response = await fetch('https://localhost:7120/api/Auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            console.log('Sunucu yan�t�:', response.status);
            const data = await response.json();
            console.log('Sunucu yan�t verisi:', data);

            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.message || data.details || 'Bir hata olu�tu');
            }
        } catch (err) {
            console.error('�ifre s�f�rlama hatas�:', err);
            setError('Sunucuya ba�lan�rken bir hata olu�tu. L�tfen daha sonra tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <h2>�ifremi Unuttum</h2>
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
                        {loading ? 'G�nderiliyor...' : '�ifre S�f�rlama Ba�lant�s� G�nder'}
                    </button>
                </form>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
                <div className="footer">
                    <a href="/login">Giri� sayfas�na d�n</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;