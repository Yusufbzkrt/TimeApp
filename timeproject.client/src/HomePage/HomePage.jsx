import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faInfoCircle,
    faHome,
    faCalendarAlt,
    faEnvelope,
    faQuestionCircle,
    faBlog,
    faSignInAlt,
    faHandsHelping,
    faHandHoldingHeart,
    faUsers,
    faClock,
    faHeart,
    faTimes,
    faCalendar
} from '@fortawesome/free-solid-svg-icons';

import './HomePage.css'; // CSS dosyasını dahil edelim
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
    const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

    const serviceDetails = {
        title: "Hizmet Al",
        description: `Time Bank'ta hizmet almak çok kolay! Kazandığınız zaman kredileriyle ihtiyacınız olan hizmetlere erişebilirsiniz.

Nasıl Hizmet Alabilirsiniz?

1. Üye Olun
   - Platformumuza ücretsiz üye olun
   - Profilinizi oluşturun ve ilgi alanlarınızı belirleyin

2. Zaman Kredisi Kazanın
   - Topluluğa hizmet vererek zaman kredileri kazanın
   - Her bir saat hizmet için 1 kredi kazanın
   - Kredilerinizi istediğiniz zaman kullanın

3. Hizmet Seçin
   - Mevcut hizmetleri inceleyin
   - Size uygun hizmet sağlayıcıyı seçin
   - Takvimden uygun zamanı belirleyin

4. Hizmeti Alın
   - Seçtiğiniz hizmet için randevu oluşturun
   - Hizmet sağlayıcı ile iletişime geçin
   - Hizmeti alın ve değerlendirin

Sunulan Hizmet Kategorileri:
- Eğitim ve Öğretim
- Ev İşleri Yardımı
- Bahçe Bakımı
- Evcil Hayvan Bakımı
- Yaşlı ve Hasta Bakımı
- Teknik Destek
- Sanatsal Faaliyetler
- Spor ve Fitness
- Dil Öğrenimi
- El Becerileri

Güvenlik ve Kalite:
- Tüm hizmet sağlayıcılar değerlendirme sürecinden geçer
- Kullanıcı yorumları ve puanlamaları şeffaf bir şekilde görüntülenir
- Güvenli ödeme sistemi
- 7/24 destek hizmeti`,
        icon: faHandHoldingHeart
    };

    const eventsDetails = {
        title: "Etkinlikler",
        description: `Time Bank'ta topluluk etkinlikleriyle sosyal bağlarınızı güçlendirin ve yeni beceriler kazanın!

Etkinlik Türlerimiz:

1. Eğitim Etkinlikleri
   - Beceri paylaşım atölyeleri
   - Kişisel gelişim seminerleri
   - Dil pratik grupları
   - Teknoloji eğitimleri

2. Sosyal Etkinlikler
   - Topluluk buluşmaları
   - Kültür-sanat aktiviteleri
   - Spor etkinlikleri
   - Hobi grupları

3. Gönüllülük Projeleri
   - Sosyal sorumluluk projeleri
   - Çevre koruma etkinlikleri
   - Topluluk hizmet günleri
   - Yardımlaşma organizasyonları

Etkinliklere Katılım:
- Ücretsiz katılım imkanı
- Online ve yüz yüze etkinlikler
- Esnek katılım seçenekleri
- Sertifika imkanı

Etkinlik Avantajları:
- Yeni insanlarla tanışma fırsatı
- Deneyim paylaşımı
- Networking imkanları
- Topluluk bağlarını güçlendirme

Nasıl Katılabilirsiniz?
- Etkinlik takvimini inceleyin
- İlgilendiğiniz etkinliğe kayıt olun
- Hatırlatıcı bildirimleri alın
- Etkinliğe katılın ve deneyimleyin`,
        icon: faCalendar
    };

    const volunteerDetails = {
        title: "Gönüllü Ol",
        description: `Time Bank ile toplumsal dayanışmayı güçlendirin ve sosyal etkiyi artırın!

Sosyal Etki ve Faydalar:

1. Toplumsal Dayanışma
   - Karşılıklı yardımlaşma kültürünü geliştirme
   - Sosyal bağları güçlendirme
   - Topluluk bilincini artırma
   - Nesiller arası iletişimi destekleme

2. Ekonomik Fayda
   - Para kullanmadan hizmet alışverişi
   - Herkes için eşit fırsatlar
   - Sürdürülebilir ekonomik model
   - Yerel ekonomiyi güçlendirme

3. Kişisel Gelişim
   - Yeni beceriler kazanma
   - Deneyim paylaşımı
   - Özgüven geliştirme
   - Sosyal network oluşturma

4. Toplumsal Katkı
   - Sosyal eşitsizlikleri azaltma
   - Dezavantajlı grupları destekleme
   - Toplumsal entegrasyonu artırma
   - Sürdürülebilir kalkınmaya katkı

İstatistiklerle Time Bank:
- 1000+ aktif gönüllü
- 5000+ tamamlanan hizmet
- 10.000+ saat değişimi
- %95 kullanıcı memnuniyeti

Gönüllü Olmanın Avantajları:
- Esnek zaman yönetimi
- Çeşitli hizmet seçenekleri
- Güvenli platform
- Profesyonel destek
- Topluluk desteği

Hemen üye olun ve toplumsal değişimin bir parçası olun!`,
        icon: faHandsHelping
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    const openEventsModal = () => {
        setIsEventsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeEventsModal = () => {
        setIsEventsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    const openVolunteerModal = () => {
        setIsVolunteerModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeVolunteerModal = () => {
        setIsVolunteerModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <h1>Time Bank'a Hoş Geldiniz!</h1>
                    <p>Zamanınızı paylaşın, topluluğa katkıda bulunun ve karşılığında ihtiyacınız olan hizmetleri alın.</p>
                    <div className="header-buttons">
                        <Link to="/register" className="btn btn-primary">
                            <FontAwesomeIcon icon={faUserPlus} /> Hemen Başla
                        </Link>
                        <Link to="/about" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faInfoCircle} /> Daha Fazla Bilgi
                        </Link>
                    </div>
                </div>
            </header>

         

            <section className="home-services">
                <h2>Hizmetlerimiz</h2>
                <div className="service-list">
                    <div className="service-item">
                        <FontAwesomeIcon icon={volunteerDetails.icon} />
                        <h3>{volunteerDetails.title}</h3>
                        <p>Topluluğa hizmet vererek hem sosyal etki yaratın hem de ihtiyacınız olan hizmetler için kredi kazanın. Ücretsiz platformumuzla toplumsal dayanışmaya katkıda bulunun!</p>
                        <div className="service-buttons">
                            <button onClick={openVolunteerModal} className="btn btn-outline">
                                <FontAwesomeIcon icon={faInfoCircle} /> Detaylı Bilgi
                            </button>
                          
                        </div>
                    </div>
                    <div className="service-item">
                        <FontAwesomeIcon icon={serviceDetails.icon} />
                        <h3>{serviceDetails.title}</h3>
                        <p>Kazandığınız zaman kredileriyle topluluk üyelerinden çeşitli hizmetler alın!</p>
                        <button onClick={openModal} className="btn btn-outline">
                            <FontAwesomeIcon icon={faInfoCircle} /> Detaylı Bilgi
                        </button>
                    </div>
                    <div className="service-item">
                        <FontAwesomeIcon icon={eventsDetails.icon} />
                        <h3>{eventsDetails.title}</h3>
                        <p>Topluluk etkinliklerine katılın, yeni insanlarla tanışın ve değerli deneyimler kazanın!</p>
                        <button onClick={openEventsModal} className="btn btn-outline">
                            <FontAwesomeIcon icon={faInfoCircle} /> Detaylı Bilgi
                        </button>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2>Neden Time Bank?</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faUsers} />
                        <h3>Topluluk</h3>
                        <p>Yerel topluluğunuzla bağlantı kurun ve birlikte büyüyün.</p>
                    </div>
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faClock} />
                        <h3>Zaman Yönetimi</h3>
                        <p>Zamanınızı verimli kullanın ve karşılığını alın.</p>
                    </div>
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faHeart} />
                        <h3>Dayanışma</h3>
                        <p>Topluluk içinde karşılıklı yardımlaşma ve dayanışma.</p>
                    </div>
                </div>
            </section>

           

            {/* Hizmet Detay Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content service-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="modal-header">
                            <FontAwesomeIcon icon={serviceDetails.icon} className="modal-icon" />
                            <h2>{serviceDetails.title}</h2>
                        </div>
                        <div className="modal-body">
                            {serviceDetails.description.split('\n\n').map((paragraph, index) => (
                                <div key={index} className="modal-section">
                                    {paragraph.split('\n').map((line, lineIndex) => {
                                        if (line.trim().endsWith(':')) {
                                            return <h3 key={lineIndex}>{line}</h3>;
                                        } else if (line.trim().startsWith('-')) {
                                            return <li key={lineIndex}>{line.trim().substring(1)}</li>;
                                        } else if (line.trim().match(/^\d\./)) {
                                            return <h4 key={lineIndex}>{line}</h4>;
                                        } else {
                                            return <p key={lineIndex}>{line}</p>;
                                        }
                                    })}
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <Link to="/register" className="btn btn-primary">
                                <FontAwesomeIcon icon={faUserPlus} /> Hemen Üye Ol
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Events Modal */}
            {isEventsModalOpen && (
                <div className="modal-overlay" onClick={closeEventsModal}>
                    <div className="modal-content service-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeEventsModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="modal-header">
                            <FontAwesomeIcon icon={eventsDetails.icon} className="modal-icon" />
                            <h2>{eventsDetails.title}</h2>
                        </div>
                        <div className="modal-body">
                            {eventsDetails.description.split('\n\n').map((paragraph, index) => (
                                <div key={index} className="modal-section">
                                    {paragraph.split('\n').map((line, lineIndex) => {
                                        if (line.trim().endsWith(':')) {
                                            return <h3 key={lineIndex}>{line}</h3>;
                                        } else if (line.trim().startsWith('-')) {
                                            return <li key={lineIndex}>{line.trim().substring(1)}</li>;
                                        } else if (line.trim().match(/^\d\./)) {
                                            return <h4 key={lineIndex}>{line}</h4>;
                                        } else {
                                            return <p key={lineIndex}>{line}</p>;
                                        }
                                    })}
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <Link to="/AllEvents" className="btn btn-primary">
                                <FontAwesomeIcon icon={faCalendar} /> Etkinlikleri Görüntüle
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Volunteer Modal */}
            {isVolunteerModalOpen && (
                <div className="modal-overlay" onClick={closeVolunteerModal}>
                    <div className="modal-content service-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeVolunteerModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="modal-header">
                            <FontAwesomeIcon icon={volunteerDetails.icon} className="modal-icon" />
                            <h2>{volunteerDetails.title}</h2>
                        </div>
                        <div className="modal-body">
                            {volunteerDetails.description.split('\n\n').map((paragraph, index) => (
                                <div key={index} className="modal-section">
                                    {paragraph.split('\n').map((line, lineIndex) => {
                                        if (line.trim().endsWith(':')) {
                                            return <h3 key={lineIndex}>{line}</h3>;
                                        } else if (line.trim().startsWith('-')) {
                                            return <li key={lineIndex}>{line.trim().substring(1)}</li>;
                                        } else if (line.trim().match(/^\d\./)) {
                                            return <h4 key={lineIndex}>{line}</h4>;
                                        } else {
                                            return <p key={lineIndex}>{line}</p>;
                                        }
                                    })}
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <Link to="/register" className="btn btn-primary">
                                <FontAwesomeIcon icon={faUserPlus} /> Hemen Üye Ol
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
