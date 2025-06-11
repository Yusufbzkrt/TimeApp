import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css'; // CSS dosyasını dahil edelim
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <h1>Time Bank'a Hoş Geldiniz!</h1>
                    <p>Zamanınızı paylaşın, topluluğa katkıda bulunun ve karşılığında ihtiyacınız olan hizmetleri alın.</p>
                    <div className="header-buttons">
                        <Link to="/register" className="btn btn-primary">
                            <i className="fas fa-user-plus"></i> Hemen Başla
                        </Link>
                        <Link to="/about" className="btn btn-secondary">
                            <i className="fas fa-info-circle"></i> Daha Fazla Bilgi
                        </Link>
                    </div>
                </div>
            </header>

            <nav className="navbar">
                <ul>
                    <li><Link to="/"><i className="fas fa-home"></i> Anasayfa</Link></li>
                    <li><Link to="/about"><i className="fas fa-info-circle"></i> Hakkımızda</Link></li>
                    <li><Link to="/AllEvents"><i className="fas fa-calendar-alt"></i> Etkinlikler</Link></li>
                    <li><Link to="/contact"><i className="fas fa-envelope"></i> İletişim</Link></li>
                    <li><Link to="/help"><i className="fas fa-question-circle"></i> Yardım</Link></li>
                    <li><Link to="/blog"><i className="fas fa-blog"></i> Blog</Link></li>
                    <li className="login"><Link to="/login"><i className="fas fa-sign-in-alt"></i> Giriş Yap</Link></li>
                </ul>
            </nav>

            <section className="home-services">
                <h2>Hizmetlerimiz</h2>
                <div className="service-list">
                    <div className="service-item">
                        <i className="fas fa-hands-helping"></i>
                        <h3>Gönüllü Ol</h3>
                        <p>Topluluğa hizmet vererek zaman kredileri kazanın ve bu kredileri ihtiyacınız olan hizmetler için kullanın!</p>
                        <Link to="/volunteer" className="btn btn-outline">
                            <i className="fas fa-arrow-right"></i> Detaylı Bilgi
                        </Link>
                    </div>
                    <div className="service-item">
                        <i className="fas fa-hand-holding-heart"></i>
                        <h3>Hizmet Al</h3>
                        <p>Kazandığınız zaman kredileriyle topluluk üyelerinden çeşitli hizmetler alın!</p>
                        <Link to="/services" className="btn btn-outline">
                            <i className="fas fa-arrow-right"></i> Detaylı Bilgi
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2>Neden Time Bank?</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <i className="fas fa-users"></i>
                        <h3>Topluluk</h3>
                        <p>Yerel topluluğunuzla bağlantı kurun ve birlikte büyüyün.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-clock"></i>
                        <h3>Zaman Yönetimi</h3>
                        <p>Zamanınızı verimli kullanın ve karşılığını alın.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-heart"></i>
                        <h3>Dayanışma</h3>
                        <p>Topluluk içinde karşılıklı yardımlaşma ve dayanışma.</p>
                    </div>
                </div>
            </section>

            <footer className="home-footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <Link to="/about">Hakkımızda</Link>
                        <Link to="/contact">İletişim</Link>
                        <Link to="/privacy">Gizlilik Politikası</Link>
                        <Link to="/terms">Kullanım Şartları</Link>
                    </div>
                    <div className="social-links">
                        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    </div>
                    <p>&copy; 2024 Time Bank. Tüm Hakları Saklıdır.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
