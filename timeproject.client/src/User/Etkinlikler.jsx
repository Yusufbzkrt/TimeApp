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
    faSave
} from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Etkinlikler.css';

const Etkinlikler = () => {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ 
        title: '', 
        description: '', 
        date: '', 
        time: '',
        image: null 
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
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
    const handleEdit = (eventsId) => {
        navigate(`/user/etkinlikler/duzenle/${eventsId}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("Title", form.title);
            formData.append("Description", form.description);
            formData.append("Date", form.date);
            formData.append("Time", form.time);
            if (form.image) {
                formData.append("Image", form.image);
            }

            const res = await fetch('https://localhost:7120/api/User/AddEtkinlik', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formData,
            });

            if (res.ok) {
                setForm({ title: '', description: '', date: '', time: '', image: null });
                setImagePreview(null);
                setShowForm(false);
                fetchEvents();
            } else {
                console.error('Etkinlik eklenemedi');
            }
        } catch (err) {
            console.error('Etkinlik ekleme hatası:', err);
        } finally {
            setSaving(false);
        }
    };

    const handlePreview = (event) => {
        setSelectedEvent(event);
    };

    const closePreview = () => {
        setSelectedEvent(null);
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = !filterDate || new Date(event.dateTime).toLocaleDateString() === new Date(filterDate).toLocaleDateString();
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
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Etkinlik Açıklaması</label>
                                <div className="quill-editor">
                                    <ReactQuill
                                        theme="snow"
                                        value={form.description}
                                        onChange={(content) => setForm({ ...form, description: content })}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Etkinlik açıklamasını girin..."
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tarih</label>
                                    <input
                                        type="date"
                                        value={form.date}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Saat</label>
                                    <input
                                        type="time"
                                        value={form.time}
                                        onChange={(e) => setForm({ ...form, time: e.target.value })}
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
                                    <p>{event.description.length > 400 ? `${event.description.substring(0, 400)}...` : event.description}</p>
                                    <div className="event-meta">
                                        <span className="event-date">
                                            <FontAwesomeIcon icon={faClock} />
                                            {new Date(event.dateTime).toLocaleString()}
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
                                            onClick={() => handleEdit(event.eventsId)}
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
                        <button className="close-modal" onClick={closePreview}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        {selectedEvent.image && (
                            <div className="preview-image">
                                <img 
                                    src={`https://localhost:7120${selectedEvent.image}`} 
                                    alt={selectedEvent.eventName} 
                                />
                            </div>
                        )}
                        <div className="preview-header">
                            <h2>{selectedEvent.eventName}</h2>
                            <div className="preview-date">
                                <FontAwesomeIcon icon={faClock} />
                                <span>{new Date(selectedEvent.dateTime).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="preview-body">
                            <p>{selectedEvent.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Etkinlikler;
