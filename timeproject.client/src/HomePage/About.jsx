import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUsers, faHandshake, faLightbulb, faChartLine, faHeart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="homepage-layout">
            <nav className="homepage-navbar">
                <button className="mobile-menu-button" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>
                <ul className={isMenuOpen ? 'active' : ''}>
                    <li><Link to="/"><i className="fas fa-home"></i> Anasayfa</Link></li>
                    <li><Link to="/about"><i className="fas fa-info-circle"></i> Hakkımızda</Link></li>
                    <li><Link to="/services"><i className="fas fa-calendar-alt"></i> Etkinlikler</Link></li>
                    <li><Link to="/contact"><i className="fas fa-envelope"></i> İletişim</Link></li>
                    <li><Link to="/help"><i className="fas fa-question-circle"></i> Yardım</Link></li>
                    <li><Link to="/blog"><i className="fas fa-blog"></i> Blog</Link></li>
                    <li className="login"><Link to="/login"><i className="fas fa-sign-in-alt"></i> Giriş Yap</Link></li>
                </ul>
            </nav>

            <main className="homepage-content">
                <div className="about-container">
                    <div className="about-header">
                        <h1>Hakkımızda</h1>
                        <p>Time Bank ile zamanınızı daha verimli yönetin</p>
                    </div>

                    <section className="about-mission">
                        <h2>Misyonumuz</h2>
                        <p>
                            Time Bank olarak amacımız, insanların zamanlarını daha etkili yönetmelerine
                            yardımcı olmak ve topluluk içinde karşılıklı yardımlaşmayı teşvik etmektir.
                            Platformumuz, zaman bankacılığı konsepti ile çalışarak, insanların birbirlerine
                            yardım etmelerini ve karşılığında zaman kredisi kazanmalarını sağlar.
                        </p>
                    </section>

                    <section className="about-features">
                        <h2>Neden Time Bank?</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <FontAwesomeIcon icon={faClock} className="feature-icon" />
                                <h3>Zaman Yönetimi</h3>
                                <p>Zamanınızı etkili bir şekilde planlayın ve yönetin</p>
                            </div>
                            <div className="feature-card">
                                <FontAwesomeIcon icon={faUsers} className="feature-icon" />
                                <h3>Topluluk</h3>
                                <p>Güçlü bir toplulukla bağlantı kurun ve paylaşın</p>
                            </div>
                            <div className="feature-card">
                                <FontAwesomeIcon icon={faHandshake} className="feature-icon" />
                                <h3>Güven</h3>
                                <p>Güvenilir ve şeffaf bir platform üzerinde işlem yapın</p>
                            </div>
                            <div className="feature-card">
                                <FontAwesomeIcon icon={faLightbulb} className="feature-icon" />
                                <h3>Yenilikçi</h3>
                                <p>Modern ve kullanıcı dostu arayüz ile kolay kullanım</p>
                            </div>
                            <div className="feature-card">
                                <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
                                <h3>Gelişim</h3>
                                <p>Sürekli gelişen ve büyüyen bir ekosistem</p>
                            </div>
                            <div className="feature-card">
                                <FontAwesomeIcon icon={faHeart} className="feature-icon" />
                                <h3>Dayanışma</h3>
                                <p>Topluluk içinde karşılıklı yardımlaşma ve destek</p>
                            </div>
                        </div>
                    </section>

                    <section className="about-team">
                        <h2>Ekibimiz</h2>
                        <p>
                            Deneyimli ve tutkulu ekibimiz, size en iyi hizmeti sunmak için çalışıyor.
                            Teknoloji ve topluluk yönetimi konusundaki uzmanlığımızla,
                            Time Bank'ı sürekli geliştiriyor ve iyileştiriyoruz.
                        </p>
                    </section>

                    <section className="about-values">
                        <h2>Değerlerimiz</h2>
                        <div className="values-list">
                            <div className="value-item">
                                <h3>Güven</h3>
                                <p>Güvenilir ve şeffaf bir platform sunmak en önemli önceliğimizdir.</p>
                            </div>
                            <div className="value-item">
                                <h3>Yenilikçilik</h3>
                                <p>Sürekli gelişim ve yenilik için çalışıyoruz.</p>
                            </div>
                            <div className="value-item">
                                <h3>Topluluk</h3>
                                <p>Güçlü bir topluluk oluşturmak ve desteklemek için varız.</p>
                            </div>
                        </div>
                    </section>

                    <section className="about-contact">
                        <h2>İletişime Geçin</h2>
                        <p>
                            Sorularınız veya önerileriniz için bizimle iletişime geçebilirsiniz.
                            Size yardımcı olmaktan mutluluk duyarız.
                        </p>
                        <button className="contact-button">İletişim</button>
                    </section>
                </div>
            </main>

            <footer className="homepage-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Time Bank</h3>
                        <p>Zamanınızı değerli kılın, toplulukla paylaşın.</p>
                    </div>
                    <div className="footer-section">
                        <h3>Hızlı Bağlantılar</h3>
                        <ul>
                            <li><Link to="/">Ana Sayfa</Link></li>
                            <li><Link to="/about">Hakkımızda</Link></li>
                            <li><Link to="/login">Giriş Yap</Link></li>
                            <li><Link to="/register">Kayıt Ol</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>İletişim</h3>
                        <ul>
                            <li>Email: info@timebank.com</li>
                            <li>Tel: +90 (555) 123 45 67</li>
                            <li>Adres: İstanbul, Türkiye</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Time Bank. Tüm Hakları Saklıdır.</p>
                </div>
            </footer>
        </div>
    );
};

export default About; 