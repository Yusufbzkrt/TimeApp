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

            console.log('Login response status:', response.status);
            const data = await response.json();
            console.log('Login response data:', data);

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userName', data.userName || data.name);
                    console.log('LocalStorage kaydedilen değerler:', {
                        token: localStorage.getItem('authToken'),
                        userId: localStorage.getItem('userId'),
                        userName: localStorage.getItem('userName')
                    });
                    window.location.href = '/user/home';
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Hata mesajı
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Bir hata oluştu, tekrar deneyin.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title"><i className="fa-solid fa-right-to-bracket"></i> Giriş</h1>
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
                        <label htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Giriş Yap</button>
                </form>
                <div className="footer">
                    <a href="/forgot-password" className="forgot-password">Şifrenizi mi unuttunuz?</a>
                    <p>Hesabınız Yok mu? <a href="/register">Kayıt Ol</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
