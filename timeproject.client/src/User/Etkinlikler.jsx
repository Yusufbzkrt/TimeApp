import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarPlus, 
    faCalendarAlt, 
    faEdit, 
    faTrash, 
    faImage, 
    faClock,
    faPlus,
    faSearch,
    faFilter,
    faEye,
    faTimes,
    faSpinner,
    faExclamationCircle,
    faUpload,
    faSave,
    faArrowLeft,
    faMapMarkerAlt,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Etkinlikler.css';

const Etkinlikler = () => {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ 
        eventName: '', 
        description: '', 
        dateTime: '',
        location: '',
        capacity: '',
        credit: '',
        image: null 
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // Quill editör modülleri ve formatları
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'color', 'background',
        'link', 'image'
    ];

    // Etkinlikleri çek
    const fetchEvents = async () => {
        try {
            const res = await fetch('https://localhost:7120/api/events/GetEvents', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                }
            });

            if (!res.ok) {
                throw new Error(`API hata: ${res.status}`);
            }

            const text = await res.text();
            console.log('API yanıtı:', text);

            if (!text) {
                setEvents([]);
                return;
            }

            const data = JSON.parse(text);
            setEvents(data);

        } catch (err) {
            setEvents([]);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (eventsId) => {
        if (!eventsId) {
            alert('Geçersiz etkinlik ID');
            return;
        }

        try {
            const res = await fetch(`https://localhost:7120/api/Events/${eventsId}`, {
                method: 'DELETE',
            });

            const data = await res.text(); // JSON olarak yanıtı al

            if (res.ok) {
                fetchEvents(); // Etkinlikleri güncelle
                alert(data.message || 'Etkinlik başarıyla silindi.');
            } else {
                alert(data.errorText || 'Etkinlik silinirken bir hata oluştu.');
            }
        } catch (err) {
            console.error('Silme hatası:', err);
            alert('Bir hata oluştu.');
        }
    };

    // Güncelleme işlemi
    const handleEdit = (event) => {
        console.log('Editing event:', event);
        setEditingEvent(event);
        setForm({
            id: event.eventsId,
            eventName: event.eventName,
            description: event.description,
            dateTime: toLocalDatetimeInputValue(event.dateTime),
            location: event.location || '',
            capacity: event.capacity || '',
            credit: event.credit || '',
            image: event.image || '',
            imageFile: null
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('EventName', form.eventName);
            formData.append('Description', form.description);
            formData.append('DateTime', new Date(form.dateTime).toISOString());
            formData.append('Location', form.location);
            formData.append('Capacity', form.capacity);
            formData.append('Credit', parseInt(form.credit));
            if (form.imageFile) {
                formData.append('Image', form.imageFile);
            }

            // Debug için gönderilen verileri logla
            console.log('Updating event with data:', {
                eventName: form.eventName,
                description: form.description,
                dateTime: form.dateTime,
                location: form.location,
                capacity: form.capacity,
                credit: form.credit
            });

            const res = await fetch(`https://localhost:7120/api/Events/${editingEvent.eventsId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Update error response:', errorText);
                throw new Error('Etkinlik güncellenemedi');
            }

            alert('Etkinlik başarıyla güncellendi');
            setEditingEvent(null);
            fetchEvents();
        } catch (err) {
            console.error('Güncelleme hatası:', err);
            alert('Etkinlik güncellenirken bir hata oluştu');
        } finally {
            setSaving(false);
        }
    };

    const handleCloseEdit = () => {
        setEditingEvent(null);
        setForm({ title: '', description: '', date: '', time: '', image: null });
        setImagePreview(null);
    };

    const toLocalDatetimeInputValue = (dateString) => {
        const dt = new Date(dateString);
        if (isNaN(dt)) return '';
        const pad = (n) => n.toString().padStart(2, '0');
        return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Form verilerini kontrol et
            console.log('Form Values Before Submit:', {
                eventName: form.eventName,
                description: form.description,
                dateTime: form.dateTime,
                location: form.location,
                capacity: form.capacity,
                credit: form.credit
            });

            const formData = new FormData();
            formData.append("EventName", form.eventName);
            formData.append("Description", form.description);
            formData.append("DateTime", form.dateTime);
            formData.append("Location", form.location);
            formData.append("Capacity", form.capacity);
            formData.append("Credit", parseInt(form.credit));
            formData.append("IsActive", true);
            if (form.image) {
                formData.append("Image", form.image);
            }

            // Debug: FormData içeriğini kontrol et
            console.log('Form Data Entries:');
            for (let pair of formData.entries()) {
                console.log(pair[0], ':', pair[1], typeof pair[1]);
            }

            const res = await fetch('https://localhost:7120/api/events/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formData,
            });

            const responseText = await res.text();
            console.log('Raw API Response:', responseText);

            if (!res.ok) {
                console.error('API Error Response:', responseText);
                throw new Error(`API Error: ${responseText}`);
            }

            const result = JSON.parse(responseText);
            console.log('Parsed API Response:', result);

            // Başarılı yanıt kontrolü
            if (result.eventsId) {
                console.log('Event created successfully with ID:', result.eventsId);
                
                setForm({ 
                    eventName: '', 
                    description: '', 
                    dateTime: '',
                    location: '',
                    capacity: '',
                    credit: '',
                    image: null 
                });
                setImagePreview(null);
                setShowForm(false);
                fetchEvents();
            } else {
                throw new Error('Event creation failed: No event ID returned');
            }
        } catch (err) {
            console.error('Etkinlik ekleme hatası:', err);
            alert('Etkinlik eklenirken bir hata oluştu: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    // Form alanlarını güncellerken değerleri kontrol et
    const handleFormChange = (field, value) => {
        console.log(`Updating ${field}:`, value);
        setForm(prev => ({ ...prev, [field]: value }));
    };

    // Form submit öncesi veri kontrolü için yardımcı fonksiyon
    const validateFormData = () => {
        if (!form.eventName) {
            alert('Etkinlik adı gerekli');
            return false;
        }
        if (!form.description) {
            alert('Etkinlik açıklaması gerekli');
            return false;
        }
        if (!form.dateTime) {
            alert('Tarih ve saat gerekli');
            return false;
        }
        if (!form.location) {
            alert('Konum gerekli');
            return false;
        }
        if (!form.capacity || form.capacity < 1) {
            alert('Geçerli bir kapasite giriniz');
            return false;
        }
        if (!form.credit || form.credit < 1) {
            alert('Geçerli bir kredi miktarı giriniz');
            return false;
        }
        return true;
    };

    const handlePreview = (event) => {
        setSelectedEvent({
            ...event,
            description: stripHtml(event.description) // HTML etiketlerini kaldır
        });
    };

    const closePreview = () => {
        setSelectedEvent(null);
    };

    const filteredEvents = events.filter(event => {
        const eventName = event.eventName ?? "";       // null/undefined ise boş string
        const description = event.description ?? "";

        const matchesSearch =
            eventName.toLowerCase().includes(searchTerm?.toLowerCase() ?? "") ||
            description.toLowerCase().includes(searchTerm?.toLowerCase() ?? "");

        const matchesDate =
            !filterDate || new Date(event.dateTime).toLocaleDateString() === new Date(filterDate).toLocaleDateString();

        return matchesSearch && matchesDate;
    });


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setForm({ ...form, image: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCloseForm = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowForm(false);
            setIsClosing(false);
        }, 300); // Animasyon süresi kadar bekle
    };

    // HTML etiketlerini kaldıran yardımcı fonksiyon
    const stripHtml = (html) => {
        if (!html) return '';
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    return (
        <div className="events-container">
            <div className="events-header">
                <h1><FontAwesomeIcon icon={faCalendarAlt} /> Etkinliklerim</h1>
                <div className="events-controls">
                    <div className="search-filter">
                        <div className="search-box">
                            <FontAwesomeIcon icon={faSearch} />
                            <input
                                type="text"
                                placeholder="Etkinlik ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-box">
                            <FontAwesomeIcon icon={faFilter} />
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button 
                        className="add-event-button"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Yeni Etkinlik
                    </button>
                </div>
            </div>

            {showForm && (
                <div className={`etkinlik-form ${isClosing ? 'closing' : ''}`}>
                    <div className="form-content">
                        <div className="form-header">
                            <h2>Yeni Etkinlik</h2>
                            <button type="button" className="close-button" onClick={handleCloseForm}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Etkinlik Başlığı</label>
                                <input
                                    type="text"
                                    placeholder="Etkinlik başlığını girin"
                                    value={form.eventName}
                                    onChange={(e) => handleFormChange('eventName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Etkinlik Açıklaması</label>
                                <div className="quill-editor">
                                    <ReactQuill
                                        theme="snow"
                                        value={form.description}
                                        onChange={(content) => handleFormChange('description', content)}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Etkinlik açıklamasını girin..."
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Tarih ve Saat</label>
                                <input
                                    type="datetime-local"
                                    value={form.dateTime}
                                    onChange={(e) => handleFormChange('dateTime', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Konum</label>
                                    <input
                                        type="text"
                                        placeholder="Etkinlik konumunu girin"
                                        value={form.location}
                                        onChange={(e) => handleFormChange('location', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Kapasite</label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Maksimum katılımcı sayısı"
                                        value={form.capacity}
                                        onChange={(e) => handleFormChange('capacity', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Kredi Miktarı</label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Etkinlik için verilecek kredi"
                                        value={form.credit}
                                        onChange={(e) => handleFormChange('credit', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>
                                    <FontAwesomeIcon icon={faImage} /> Etkinlik Görseli
                                </label>
                                <div className="image-upload">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        id="etkinlik-image"
                                        className="image-input"
                                    />
                                    <label htmlFor="etkinlik-image" className="image-upload-label">
                                        <FontAwesomeIcon icon={faUpload} />
                                        <span>Görsel Seç</span>
                                    </label>
                                </div>
                                {imagePreview && (
                                    <div className="image-preview">
                                        <img src={imagePreview} alt="Etkinlik görseli" />
                                        <button 
                                            type="button" 
                                            className="remove-image"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setForm({ ...form, image: null });
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="submit-button" disabled={saving}>
                                    {saving ? (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                            <span>Kaydediliyor...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faSave} />
                                            <span>Etkinlik Ekle</span>
                                        </>
                                    )}
                                </button>
                                <button type="button" className="cancel-button" onClick={handleCloseForm}>
                                    İptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingEvent && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <div className="modal-header">
                            <h2>
                                <FontAwesomeIcon icon={faEdit} className="header-icon" />
                                Etkinlik Düzenle
                            </h2>
                            <button className="close-button" onClick={handleCloseEdit}>×</button>
                        </div>

                        <form onSubmit={handleUpdateSubmit}>
                            <div className="form-group">
                                <label>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    Etkinlik Başlığı
                                </label>
                                <input
                                    type="text"
                                    placeholder="Etkinlik başlığını girin"
                                    value={form.eventName}
                                    onChange={(e) => setForm({ ...form, eventName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FontAwesomeIcon icon={faEdit} />
                                    Etkinlik Açıklaması
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={form.description}
                                    onChange={(content) => setForm({ ...form, description: content })}
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Etkinlik detaylarını girin"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <FontAwesomeIcon icon={faClock} />
                                        Tarih ve Saat
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={form.dateTime}
                                        onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        Konum
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Etkinlik konumunu girin"
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <FontAwesomeIcon icon={faUsers} />
                                        Kapasite
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Maksimum katılımcı sayısı"
                                        value={form.capacity}
                                        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <FontAwesomeIcon icon={faUsers} />
                                        Kredi
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Etkinliğin kredi miktarını giriniz"
                                        value={form.credit}
                                        onChange={(e) => setForm({ ...form, credit: e.target.value })}
                                        required
                                    />
                                </div>
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
                                        onChange={handleImageChange}
                                        id="event-image"
                                        className="file-input"
                                    />
                                    <label htmlFor="event-image" className="file-input-label">
                                        <FontAwesomeIcon icon={faImage} />
                                        <span>Görsel Seç</span>
                                    </label>
                                </div>
                            </div>

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

                            {imagePreview && (
                                <div className="new-image-preview">
                                    <h3>Yeni Görsel Önizleme</h3>
                                    <div className="image-container">
                                        <img
                                            src={imagePreview}
                                            alt="Yeni Etkinlik Görseli"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={handleCloseEdit}
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
            )}

            <div className="events-list-container">
                <div className="events-list">
                    {filteredEvents.length === 0 ? (
                        <div className="no-events">
                            <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
                            <p>Henüz etkinlik bulunmuyor</p>
                        </div>
                    ) : (
                        filteredEvents.map((event, index) => (
                            <div key={index} className="event-item">
                                <div className="event-image">
                                    {event.image ? (
                                        <img
                                            src={`https://localhost:7120${event.image}`}
                                            alt="Etkinlik görseli"
                                        />
                                    ) : (
                                        <div className="no-image">
                                            <FontAwesomeIcon icon={faImage} />
                                        </div>
                                    )}
                                </div>
                                <div className="event-content">
                                    <h3>{event.eventName}</h3>
                                    <div className="event-description">
                                        {stripHtml(event.description)}
                                    </div>
                                    <div className="event-meta">
                                        <span className="event-date">
                                            <FontAwesomeIcon icon={faClock} />
                                            {new Date(event.dateTime).toLocaleString()}
                                        </span>
                                        <span className="event-location">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            {event.location}
                                        </span>
                                        <span className="event-capacity">
                                            <FontAwesomeIcon icon={faUsers} />
                                            {event.currentParticipants}/{event.capacity} Katılımcı
                                        </span>
                                    </div>
                                    <div className="button-container">
                                        <button 
                                            className="preview-button" 
                                            onClick={() => handlePreview(event)}
                                        >
                                            <FontAwesomeIcon icon={faEye} /> Önizle
                                        </button>
                                        <button 
                                            className="edit-button" 
                                            onClick={() => handleEdit(event)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Düzenle
                                        </button>
                                        <button 
                                            className="delete-button" 
                                            onClick={() => handleDelete(event.eventsId)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {selectedEvent && (
                <div className="preview-modal">
                    <div className="preview-modal-content">
                        <div className="modal-header">
                            <h2>
                                <FontAwesomeIcon icon={faEye} className="header-icon" />
                                Etkinlik Önizleme
                            </h2>
                            <button className="close-button" onClick={closePreview}>×</button>
                        </div>
                        <div className="preview-content">
                            {selectedEvent.image && (
                                <div className="preview-image">
                                    <img
                                        src={`https://localhost:7120${selectedEvent.image}`}
                                        alt={selectedEvent.eventName}
                                    />
                                </div>
                            )}
                            <h3>{selectedEvent.eventName}</h3>
                            <div className="preview-description">
                                {selectedEvent.description}
                            </div>
                            <div className="preview-meta">
                                <span className="preview-date">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    {new Date(selectedEvent.dateTime).toLocaleDateString('tr-TR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                                <span className="preview-time">
                                    <FontAwesomeIcon icon={faClock} />
                                    {new Date(selectedEvent.dateTime).toLocaleTimeString('tr-TR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Etkinlikler;
