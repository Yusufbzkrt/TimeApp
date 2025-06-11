import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarAlt, 
    faEdit, 
    faImage, 
    faClock, 
    faSave, 
    faTimes, 
    faSpinner,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import './Etkinlikler.css';

const EditEtkinlik = () => {
    const { eventsId } = useParams();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        title: '',
        description: '',
        date: '',
        image: '',
        imageFile: null
    });

    const toLocalDatetimeInputValue = (dateString) => {
        const dt = new Date(dateString);
        if (isNaN(dt)) return '';
        const pad = (n) => n.toString().padStart(2, '0');
        return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
    };

    useEffect(() => {
        fetchEvent();
    }, [eventsId]);

    const fetchEvent = async () => {
        try {
            const res = await fetch(`https://localhost:7120/api/Events/${eventsId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (!res.ok) throw new Error(`API Hata: ${res.status}`);

            const data = await res.json();
            setForm({
                title: data.eventName,
                description: data.description,
                date: toLocalDatetimeInputValue(data.dateTime),
                image: data.image || '',
                imageFile: null
            });
        } catch (err) {
            console.error('Etkinlik yüklenirken hata:', err);
            alert('Etkinlik yüklenirken bir hata oluştu.');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, imageFile: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('EventName', form.title);
            formData.append('Description', form.description);
            formData.append('DateTime', new Date(form.date).toISOString());
            if (form.imageFile) {
                formData.append('Image', form.imageFile);
            }

            const res = await fetch(`https://localhost:7120/api/Events/${eventsId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formData,
            });

            if (res.ok) {
                alert('Etkinlik başarıyla güncellendi');
                navigate('/user/etkinlikler');
            } else {
                alert('Etkinlik güncellenemedi');
            }
        } catch (err) {
            console.error('Güncelleme hatası:', err);
            alert('Bir hata oluştu');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/user/etkinlikler');
    };

    return (
        <div className="events-container">
            <div className="events-header">
                <div className="header-content">
                    <button className="back-button" onClick={handleCancel}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h1>
                        <FontAwesomeIcon icon={faEdit} className="header-icon" />
                        Etkinlik Düzenle
                    </h1>
                </div>
            </div>

            <div className="edit-event-form">
                {form.image && !form.imageFile && (
                    <div className="current-image-preview">
                        <h3>Mevcut Görsel</h3>
                        <div className="image-container">
                            <img
                                src={`https://localhost:7120${form.image}`}
                                alt="Mevcut Etkinlik Görseli"
                            />
                        </div>
                    </div>
                )}

                {form.imageFile && (
                    <div className="new-image-preview">
                        <h3>Yeni Görsel Önizleme</h3>
                        <div className="image-container">
                            <img
                                src={URL.createObjectURL(form.imageFile)}
                                alt="Yeni Etkinlik Görseli"
                            />
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            Etkinlik Başlığı
                        </label>
                        <input
                            type="text"
                            placeholder="Etkinlik başlığını girin"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faEdit} />
                            Etkinlik Açıklaması
                        </label>
                        <textarea
                            placeholder="Etkinlik detaylarını girin"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                <FontAwesomeIcon icon={faClock} />
                                Tarih ve Saat
                            </label>
                            <input
                                type="datetime-local"
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <FontAwesomeIcon icon={faImage} />
                                Etkinlik Görseli
                            </label>
                            <div className="file-input-container">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    id="event-image"
                                    className="file-input"
                                />
                                <label htmlFor="event-image" className="file-input-label">
                                    <FontAwesomeIcon icon={faImage} />
                                    <span>Görsel Seç</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={handleCancel}
                            disabled={saving}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                            <span>İptal</span>
                        </button>
                        <button 
                            type="submit" 
                            className="save-button"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                    <span>Kaydediliyor...</span>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faSave} />
                                    <span>Kaydet</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEtkinlik;
