// src/Auth/ResetPassword.jsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Þifreler eþleþmiyor");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://localhost:7120/api/Auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    token,
                    newPassword: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Þifreniz baþarýyla güncellendi. Giriþ sayfasýna yönlendiriliyorsunuz...");
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.message || "Þifre güncellenirken bir hata oluþtu");
            }
        } catch (err) {
            setError("Bir hata oluþtu, lütfen tekrar deneyin");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                <h2>Þifre Yenileme</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Yeni Þifre</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Þifre Tekrar</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength="6"
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Güncelleniyor...' : 'Þifreyi Güncelle'}
                    </button>
                </form>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default ResetPassword;