import React, { useState } from 'react';
import './Register.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [serviceName, setServiceName] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Add registration logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Phone Number:', phoneNumber);
        console.log('Service Name:', serviceName);
        console.log('Service Name:', surname);
        console.log('Service Name:', description);
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title"><i className="fa-solid fa-user-plus"></i> Kayit Ol</h1>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Ad:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Soyad:</label>
                        <input
                            type="text"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Sifre:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Sifre Dogrula:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Telefon:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="05xx xxx xxxx formatinda giriniz"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="serviceName">Yetenek</label>
                        <input
                            type="text"
                            id="serviceName"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            placeholder="Egitim vereceginiz konu basligini giriniz"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Yetenek Aciklamasi</label>
                        <textarea
                            id="description"
                            value={description}
                            placeholder="Egitim vereceginiz konu hakkinda kisa bir aciklama yaziniz"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="4" 
                            cols="50"
                        />
                    </div>
                    <button type="submit" className="register-button">Kayit Ol</button>
                </form>
                <div className="footer">
                    <p>Zaten bir hesabiniz var mi? <a href="/login">Giris Yap</a></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
