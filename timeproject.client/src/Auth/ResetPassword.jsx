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
            setError("�ifreler e�le�miyor");
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
                setMessage("�ifreniz ba�ar�yla g�ncellendi. Giri� sayfas�na y�nlendiriliyorsunuz...");
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.message || "�ifre g�ncellenirken bir hata olu�tu");
            }
        } catch (err) {
            setError("Bir hata olu�tu, l�tfen tekrar deneyin");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                <h2>�ifre Yenileme</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Yeni �ifre</label>
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
                        <label htmlFor="confirmPassword">�ifre Tekrar</label>
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
                        {loading ? 'G�ncelleniyor...' : '�ifreyi G�ncelle'}
                    </button>
                </form>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default ResetPassword;