import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUsers, faHandshake, faLightbulb, faChartLine, faHeart } from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
    return (
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
    );
};

export default About; 