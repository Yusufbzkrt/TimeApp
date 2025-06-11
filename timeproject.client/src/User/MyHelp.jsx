import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faQuestionCircle,
    faBook,
    faCalendarAlt,
    faUser,
    faEnvelope,
    faShieldAlt,
    faComments,
    faCheckCircle,
    faExclamationCircle,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import './MyHelp.css';

const Help = () => {
    return (
        <div className="help-container">
            <div className="help-header">
                <FontAwesomeIcon icon={faQuestionCircle} className="header-icon" />
                <h1>Yardım Merkezi</h1>
                <p className="welcome-text">
                    Hoş geldiniz! Bu sayfa, uygulamamızı daha iyi anlamanız ve kullanmanız için hazırlanmıştır.
                </p>
            </div>

            <div className="help-sections">
                <section className="help-section">
                    <div className="section-header">
                        <FontAwesomeIcon icon={faBook} className="section-icon" />
                        <h2>Site İçeriği ve Özellikleri</h2>
                    </div>

                    <div className="feature-cards">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                            <h3>Blog Yazıları</h3>
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Yeni blog yazısı oluşturabilirsiniz</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Mevcut blogları düzenleyebilirsiniz</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Blog yazılarını silebilirsiniz</span>
                                </li>
                            </ul>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                            <h3>Etkinlikler</h3>
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Yaklaşan etkinlikleri paylaşabilirsiniz</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Etkinlik detaylarını görüntüleyebilirsiniz</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Etkinlikleri kolayca yönetebilirsiniz</span>
                                </li>
                            </ul>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <h3>Profil Yönetimi</h3>
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Kişisel bilgilerinizi güncelleyebilirsiniz</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Profil fotoğrafınızı değiştirebilirsiniz</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>İletişim bilgilerinizi düzenleyebilirsiniz</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="help-section">
                    <div className="section-header">
                        <FontAwesomeIcon icon={faInfoCircle} className="section-icon" />
                        <h2>Sıkça Sorulan Sorular</h2>
                    </div>

                    <div className="faq-cards">
                        <div className="faq-card">
                            <div className="faq-question">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <h3>Blogları kimler görebilir?</h3>
                            </div>
                            <div className="faq-answer">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <p>Bloglarınız site ziyaretçileri tarafından görüntülenebilir.</p>
                            </div>
                        </div>

                        <div className="faq-card">
                            <div className="faq-question">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <h3>Bilgilerim güvende mi?</h3>
                            </div>
                            <div className="faq-answer">
                                <FontAwesomeIcon icon={faShieldAlt} />
                                <p>Evet, tüm kullanıcı bilgileriniz güvenli bir şekilde saklanmaktadır.</p>
                            </div>
                        </div>

                        <div className="faq-card">
                            <div className="faq-question">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <h3>Yardım alabileceğim başka bir yer var mı?</h3>
                            </div>
                            <div className="faq-answer">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <p>İletişim sayfasından bize ulaşabilirsiniz.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="help-section contact-section">
                    <div className="section-header">
                        <FontAwesomeIcon icon={faComments} className="section-icon" />
                        <h2>Yardımcı Olalım!</h2>
                    </div>
                    <div className="contact-card">
                        <FontAwesomeIcon icon={faComments} className="contact-icon" />
                        <p>
                            Uygulamamızla ilgili herhangi bir sorun yaşarsanız veya öneriniz olursa, 
                            lütfen bizimle iletişime geçmekten çekinmeyin. Size yardımcı olmaktan mutluluk duyarız.
                        </p>
                        <button className="contact-button" onClick={() => window.location.href = '/user/iletisim'}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>İletişime Geç</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Help;
