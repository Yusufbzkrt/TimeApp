import React from "react";
import { Link } from "react-router-dom";
import "./UserHomePage.css"; // CSS dosyasýný dahil edelim
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
    const handleLogout = () => {
        const token = localStorage.removeItem('authToken');  // Token'ý localStorage'dan sil
        console.log("token:", token)

        window.location.href = '/login';  // Çýkýþ yaptýktan sonra login sayfasýna yönlendir
    };
    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <h1>Hos Geldiniz!</h1>
                    <p>Time Bank platformuna hos geldiniz. Yardimci olabileceginiz yerler icin goz atin!</p>
                </div>
            </header>

            <nav className="navbar">
                <ul>
                    <li><Link to="/"><strong>Anasayfa</strong></Link></li>
                    <li><Link to="/Etkinlikler">Etkinliklerim</Link></li>
                    <li><Link to="/MyContact">Iletisim</Link></li>
                    <li><Link to="/MyHelp">Yardim</Link></li>
                    <li><Link to="/MyBlog">Bloglarým</Link></li>
                    <li className="logout">
                        <button onClick={handleLogout} className="logout-button">
                            <i className="fa-solid fa-sign-out"></i> Çýkýþ Yap
                        </button>
                    </li>                </ul>
            </nav>

            <section className="home-services">
                <h2>Hizmetler</h2>
                <div className="service-list">
                    <div className="service-item">
                        <h3>Gonullu Ol</h3>
                        <p>Topluluga hizmet vererek krediler kazanin!</p>
                    </div>
                    <div className="service-item">
                        <h3>Hizmet Al</h3>
                        <p>kazandiginiz kredilerle baskalarindan hizmet alin!</p>
                    </div>
                </div>
            </section>

            <footer className="home-footer">
                <p>&copy; 2025 Time Bank. Tum Haklari Saklidir.</p>
            </footer>
        </div>
    );
};

export default HomePage;
