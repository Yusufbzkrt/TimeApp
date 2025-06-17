import React, { useState } from 'react';
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
    faInfoCircle,
    faTimes,
    faPaperPlane,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import './MyHelp.css';

const Help = () => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // API endpoint'e gönder
            const response = await fetch('https://localhost:7120/api/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setTimeout(() => {
                    setShowContactModal(false);
                    setSubmitStatus(null);
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <button className="contact-button" onClick={() => setShowContactModal(true)}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>İletişime Geç</span>
                        </button>
                    </div>
                </section>
            </div>

            {/* Contact Modal */}
            {showContactModal && (
                <div className="modal-overlay" onClick={() => !isSubmitting && setShowContactModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button 
                            className="modal-close" 
                            onClick={() => !isSubmitting && setShowContactModal(false)}
                            disabled={isSubmitting}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>

                        <div className="modal-header">
                            <FontAwesomeIcon icon={faEnvelope} className="header-icon" />
                            <h2>İletişim Formu</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Adınız Soyadınız</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">E-posta Adresiniz</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Konu</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mesajınız</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    rows="5"
                                ></textarea>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="success-message">
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span>Mesajınız başarıyla gönderildi!</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="error-message">
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    <span>Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.</span>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                        <span>Gönderiliyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        <span>Gönder</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Help;
