import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import {
    faCalendarAlt, faMapMarkerAlt, faClock,
    faUsers, faSearch, faFilter, faTag,
    faChevronDown, faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import './Events.css';

const AllEvents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('date');
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/homepage/allEvents");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Etkinlikler alınamadı:", error);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events
        .filter(event => {
            const eventName = event.eventName || '';
            const description = event.description || '';
            const location = event.location || '';
            const Capasity = event.capacity || 0;
            const currentParticipants = event.currentParticipants || 0;
            const matchesSearch =
                eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === 'all' || event.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'dateTime') {
                return new Date(a.dateTime) - new Date(b.dateTime);
            } else if (sortBy === 'capacity') {
                return b.capacity - a.capacity;
            }
            return 0;
        });

    const handleJoinClick = (eventId) => {
        navigate(`/join/${eventId}`);
    };

    return (
        <div className="events-container">
            <div className="events-header">
                <h1>Tüm Etkinlikler</h1>
                <p>Time Bank topluluğunun düzenlediği etkinlikleri keşfedin</p>
            </div>

            <div className="events-controls">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Etkinlik ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button
                    className="filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    Filtreler
                    <FontAwesomeIcon icon={showFilters ? faChevronUp : faChevronDown} />
                </button>
            </div>

            {showFilters && (
                <div className="filters-panel">
                    <div className="filter-group">
                        <label>Kategori</label>
                        <div className="category-buttons">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={selectedCategory === category.id ? 'active' : ''}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Sıralama</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date">Tarihe Göre</option>
                            <option value="capacity">Kapasiteye Göre</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="events-grid">
                {filteredEvents.map(event => (
                    <div key={event.id} className="event-card">
                        <div className="event-image">
                            <img src={`https://localhost:7120${event.image}`} alt={event.eventName} />
                            <div className="event-category">
                                <FontAwesomeIcon icon={faTag} />
                                <span>{categories.find(c => c.id === event.category)?.name}</span>
                            </div>
                        </div>
                        <div className="event-content">
                            <h3>{event.eventName}</h3>
                            <p className="event-description">{event.description}</p>
                            <div className="event-details">
                                <div className="detail-item">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    <span>{event.dateTime ? new Date(event.dateTime).toLocaleDateString('tr-TR') : 'Tarih yok'}</span>
                                </div>
                                <div className="detail-item">
                                    <FontAwesomeIcon icon={faClock} />
                                    <span>{new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>

                                <div className="detail-item">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <span>{event.location}</span>
                                </div>
                                <div className="detail-item">
                                    <FontAwesomeIcon icon={faUsers} />
                                    <span>{event.currentParticipants}/{event.capacity} Katılımcı</span>
                                </div>
                            </div>
                            <div className="event-progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${(event.currentParticipants / event.capacity) * 100}%` }}
                                />
                            </div>
                            <button className="join-button" onClick={() => handleJoinClick(event.eventsId)}>
                                Katıl
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <div className="no-events">
                    <p>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>
                </div>
            )}
        </div>
    );
};

export default AllEvents; 