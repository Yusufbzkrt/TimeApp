import React, { useState } from 'react';
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7120/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    // Token'� localStorage'a kaydediyoruz
                    localStorage.setItem('authToken', data.token);
                    window.location.href = '/UserHomePage';  // Giri� ba�ar�l�ysa anasayfaya y�nlendir
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Hata mesaj�
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Bir hata olu�tu, tekrar deneyin.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title"><i className="fa-solid fa-right-to-bracket"></i> Giri�</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">�ifre</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Giri� Yap</button>
                </form>
                <div className="footer">
                    <a href="/forgot-password" className="forgot-password">�ifrenizi mi unuttunuz?</a>
                    <p>Hesab�n�z Yok mu? <a href="/register">Kay�t Ol</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
