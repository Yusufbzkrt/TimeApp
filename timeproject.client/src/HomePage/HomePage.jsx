import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // CSS dosyasýný dahil edelim
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
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
                    <li><Link to="/about">Hakkimizda</Link></li>
                    <li><Link to="/services">Etkinlikler</Link></li>
                    <li><Link to="/contact">Iletisim</Link></li>
                    <li><Link to="/help">Yardim</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li className="login"><Link to="/login"><i class="fa-solid fa-right-to-bracket"></i>Giris Yap</Link></li>
                </ul>
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
