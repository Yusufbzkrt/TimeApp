import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faUser,
    faBlog,
    faBell,
    faCog,
    faSignOutAlt,
    faHome,
    faChartLine,
    faFileAlt,
    faEnvelope,
    faInfoCircle,
    faQuestionCircle,
    faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons';

import './HomePageLayout.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePageLayout = () => {
    return (
        <div className="home-layout">
            <nav className="navbar">
                <ul>
                    <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Anasayfa</Link></li>
                    <li><Link to="/about"><FontAwesomeIcon icon={faInfoCircle} /> Hakkımızda</Link></li>
                    <li><Link to="/AllEvents"><FontAwesomeIcon icon={faCalendarAlt} /> Etkinlikler</Link></li>
                    <li><Link to="/contact"><FontAwesomeIcon icon={faEnvelope} /> İletişim</Link></li>
                    <li><Link to="/HelpPage"><FontAwesomeIcon icon={faQuestionCircle} /> Yardım</Link></li>
                    <li><Link to="/BlogList"><FontAwesomeIcon icon={faBlog} /> Blog</Link></li>
                    <li className="login"><Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Giriş Yap</Link></li>
                </ul>
            </nav>

            <main className="home-content">
                <Outlet />
            </main>

            <footer className="home-footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <Link to="/about">Hakkımızda</Link>
                        <Link to="/contact">İletişim</Link>
                        <Link to="/privacy">Gizlilik Politikası</Link>
                        <Link to="/terms">Kullanım Şartları</Link>
                    </div>
                    <div className="social-links">
                        <a href="#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                    <p>&copy; 2024 Time Bank. Tüm Hakları Saklıdır.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePageLayout;
