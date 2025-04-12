import React from 'react';
import './MyHelp.css'; // İstersen stil ekleyebilirsin

const Help = () => {
    return (
        <div className="help-container">
            <h1><i className="fas fa-question-circle"></i> Yardım Sayfası</h1>

            <p>
                <strong>Hoş geldiniz!</strong> Bu sayfa, web sitemdeki özellikleri daha iyi anlaman ve kolayca kullanabilmen için hazırlanmıştır.
            </p>

            <hr />

            <h2>📌 Site İçeriği ve Özellikleri</h2>

            <h3>📝 Blog Yazıları</h3>
            <ul>
                <li><strong>Blog Ekleme:</strong> Yeni bir blog yazısı oluşturabilirsin.</li>
                <li><strong>Düzenleme:</strong> Daha önce yazdığın blogları düzenleyebilirsin.</li>
                <li><strong>Silme:</strong> İstemediğin blogları silebilirsin.</li>
            </ul>

            <h3>🎉 Etkinlikler</h3>
            <ul>
                <li>Yaklaşan etkinlikleri paylaşabilir, detaylarını görüntüleyebilir ya da kaldırabilirsin.</li>
                <li>Etkinlik ekleme ve silme işlemleri oldukça kolaydır.</li>
            </ul>

            <h3>👤 Hakkımda Sayfası</h3>
            <ul>
                <li>Kendi bilgilerini (ad, soyad, e-posta, telefon vb.) güncelleyebilirsin.</li>
                <li>Profil fotoğrafını yükleyebilir veya değiştirebilirsin.</li>
                <li>Bu bölüm seni tanıtmaya yardımcı olur.</li>
            </ul>

            <hr />

            <h2>❓ Sıkça Sorulan Sorular</h2>
            <p><strong>1. Blogları kimler görebilir?</strong><br />
                Blogların site ziyaretçileri tarafından görüntülenebilir.
            </p>
            <p><strong>2. Bilgilerim güvende mi?</strong><br />
                Evet, kullanıcı bilgilerin güvenli şekilde saklanır.
            </p>
            <p><strong>3. Yardım alabileceğim başka bir yer var mı?</strong><br />
                İletişim sayfasından bana ulaşabilirsin.
            </p>

            <hr />

            <h2>💬 Yardımcı Olalım!</h2>
            <p>
                Siteyle ilgili herhangi bir sorun yaşarsan veya önerin olursa, lütfen bana ulaşmaktan çekinme.
            </p>
        </div>
    );
};

export default Help;
