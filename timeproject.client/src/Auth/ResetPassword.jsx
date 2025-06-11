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
            setMessage("�ifreler uyu�muyor");
            return;
        }

        try {
            const response = await fetch('https://localhost:7120/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
            });

            if (response.ok) {
                setMessage("�ifreniz ba�ar�yla yenilendi");
            } else {
                setMessage("Token ge�ersiz veya s�resi dolmu�");
            }
        } catch (err) {
            setMessage("Bir hata olu�tu");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>�ifre Yenile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Yeni �ifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="�ifreyi Tekrarla"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">�ifreyi G�ncelle</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;
