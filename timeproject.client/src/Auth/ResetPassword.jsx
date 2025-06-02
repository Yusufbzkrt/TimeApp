import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Þifreler uyuþmuyor");
            return;
        }

        try {
            const response = await fetch('https://localhost:7120/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
            });

            if (response.ok) {
                setMessage("Þifreniz baþarýyla yenilendi");
            } else {
                setMessage("Token geçersiz veya süresi dolmuþ");
            }
        } catch (err) {
            setMessage("Bir hata oluþtu");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Þifre Yenile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Yeni Þifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Þifreyi Tekrarla"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Þifreyi Güncelle</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;
