import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faQuestionCircle,
    faEnvelope,
    faPhone,
    faBook,
    faChevronDown,
    faChevronUp,
    faMapMarkerAlt,
    faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import './HelpPage.css';

const HelpPage = () => {
    const [activeSection, setActiveSection] = useState('faq');
    const [openFaqId, setOpenFaqId] = useState(null);

    const faqData = [
        {
            id: 1,
            question: "Nasıl üye olabilirim?",
            answer: "Sağ üst köşedeki 'Üye Ol' butonuna tıklayarak üyelik formunu doldurabilirsiniz. E-posta adresinizi onayladıktan sonra hesabınız aktif hale gelecektir."
        },
        {
            id: 2,
            question: "Şifremi unuttum, ne yapmalıyım?",
            answer: "Giriş sayfasındaki 'Şifremi Unuttum' bağlantısına tıklayarak e-posta adresinizi girebilirsiniz. Size şifre sıfırlama bağlantısı gönderilecektir."
        },
        {
            id: 3,
            question: "Blog yazısı nasıl paylaşabilirim?",
            answer: "Üye girişi yaptıktan sonra profil sayfanızdaki 'Yeni Blog Yazısı' butonunu kullanarak blog yazınızı oluşturabilirsiniz."
        },
        {
            id: 4,
            question: "Profilimi nasıl güncelleyebilirim?",
            answer: "Profil sayfanızda 'Profili Düzenle' seçeneğine tıklayarak bilgilerinizi güncelleyebilirsiniz."
        },
        {
            id: 5,
            question: "Blog yazımı nasıl düzenleyebilirim?",
            answer: "Profil sayfanızda blog yazılarınızı görebilir ve 'Düzenle' butonuna tıklayarak değişiklik yapabilirsiniz."
        }
    ];

    const userGuideData = [
        {
            title: "Üyelik İşlemleri",
            content: "Platformumuza üye olmak için sağ üst köşedeki 'Üye Ol' butonunu kullanabilirsiniz. Üyelik formunu doldurduktan sonra e-posta adresinize bir doğrulama bağlantısı gönderilecektir."
        },
        {
            title: "Blog Yazısı Oluşturma",
            content: "Blog yazısı oluşturmak için üye girişi yapmanız gerekmektedir. Profil sayfanızdan 'Yeni Blog Yazısı' butonuna tıklayarak yazınızı oluşturabilirsiniz."
        },
        {
            title: "Profil Yönetimi",
            content: "Profil sayfanızdan kişisel bilgilerinizi güncelleyebilir, profil fotoğrafınızı değiştirebilir ve blog yazılarınızı yönetebilirsiniz."
        }
    ];

    const toggleFaq = (id) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    return (
        <div className="help-page-container">
            <div className="help-header">
                <h1>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    Yardım Merkezi
                </h1>
                <p>Size nasıl yardımcı olabiliriz?</p>
            </div>

            <div className="help-navigation">
                <button 
                    className={`nav-button ${activeSection === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveSection('faq')}
                >
                    Sık Sorulan Sorular
                </button>
                <button 
                    className={`nav-button ${activeSection === 'guide' ? 'active' : ''}`}
                    onClick={() => setActiveSection('guide')}
                >
                    Kullanım Kılavuzu
                </button>
                <button 
                    className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}
                    onClick={() => setActiveSection('contact')}
                >
                    İletişim
                </button>
            </div>

            <div className="help-content">
                {activeSection === 'faq' && (
                    <div className="faq-section">
                        <h2>Sık Sorulan Sorular</h2>
                        <div className="faq-list">
                            {faqData.map(faq => (
                                <div 
                                    key={faq.id} 
                                    className={`faq-item ${openFaqId === faq.id ? 'open' : ''}`}
                                >
                                    <div 
                                        className="faq-question"
                                        onClick={() => toggleFaq(faq.id)}
                                    >
                                        <span>{faq.question}</span>
                                        <FontAwesomeIcon 
                                            icon={openFaqId === faq.id ? faChevronUp : faChevronDown} 
                                        />
                                    </div>
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeSection === 'guide' && (
                    <div className="guide-section">
                        <h2>Kullanım Kılavuzu</h2>
                        <div className="guide-list">
                            {userGuideData.map((guide, index) => (
                                <div key={index} className="guide-item">
                                    <h3>
                                        <FontAwesomeIcon icon={faBook} />
                                        {guide.title}
                                    </h3>
                                    <p>{guide.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeSection === 'contact' && (
                    <div className="contact-section">
                        <h2>İletişim Bilgileri</h2>
                        <div className="contact-info">
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <div>
                                    <h3>E-posta</h3>
                                    <p>destek@timeproject.com</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faPhone} />
                                <div>
                                    <h3>Telefon</h3>
                                    <p>+90 (555) 123 45 67</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <div>
                                    <h3>Adres</h3>
                                    <p>Elazığ / Merkez no:51 Fırat Üniversitesi Teknokent </p>
                                </div>
                            </div>
                        </div>
                        <div className="contact-links">
                            <a href="/contact" className="contact-link">
                                İletişim Formu
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HelpPage; 