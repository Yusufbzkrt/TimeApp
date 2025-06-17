import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faCheck,
    faTrash,
    faEdit,
    faClock,
    faCalendarAlt,
    faFilter,
    faSort,
    faSearch
} from '@fortawesome/free-solid-svg-icons';
import './Task.css';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'normal',
        status: 'pending'
    });
    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [sortBy, setSortBy] = useState('dueDate'); // dueDate, priority, title
    const [searchQuery, setSearchQuery] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    // Görevleri API'den çek
    const fetchTasks = async () => {
        try {
            const res = await fetch('https://localhost:7120/api/Task/GetTasks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                }
            });

            if (!res.ok) {
                throw new Error(`API hata: ${res.status}`);
            }

            const data = await res.json();
            console.log("📥 Backend'den gelen görevler:", data); // Backend'den gelen veriyi kontrol et
            setTasks(data);
        } catch (err) {
            console.error('Görevler yüklenirken hata:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskSubmit = async (e) => {
        e.preventDefault();

        if (!newTask.title.trim() || !newTask.description.trim() || !newTask.dueDate) {
            alert('Tüm alanları doldurmanız gerekiyor.');
            return;
        }

        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                alert('Oturum süresi dolmuş.');
                return;
            }

            const tokenPayload = JSON.parse(atob(authToken.split('.')[1]));
            const userId = parseInt(tokenPayload["nameid"]);
            const createdBy = tokenPayload["email"] || "Anonymous";

            const taskData = {
                taskID: editingTask?.taskID || 0,
                taskName: newTask.title.trim(),
                description: newTask.description.trim(),
                dueDate: new Date(newTask.dueDate).toISOString(),
                priority: newTask.priority.toLowerCase(),
                status: newTask.status.toLowerCase(),
                userId: userId,
                createdByUserName: createdBy
            };

            console.log("📤 Gönderilen veri:", JSON.stringify(taskData, null, 2));

            // Düzenleme veya ekleme için farklı endpoint'ler kullan
            const endpoint = editingTask 
                ? `https://localhost:7120/api/Task/${editingTask.taskID}`  // Düzenleme için
                : 'https://localhost:7120/api/Task/add';                   // Ekleme için

            const res = await fetch(endpoint, {
                method: editingTask ? 'PUT' : 'POST',  // Düzenleme için PUT, ekleme için POST
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(taskData)
            });

            const responseText = await res.text();
            console.log("📥 API yanıtı (ham):", responseText);

            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                responseData = { message: "API yanıtı JSON formatında değil" };
            }

            if (!res.ok) {
                if (responseData.errors) {
                    const errorMessages = Object.entries(responseData.errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                    alert(`Validasyon hataları:\n${errorMessages}`);
                } else {
                    alert(responseData.message || 'İşlem sırasında bir hata oluştu');
                }
                return;
            }

            alert(editingTask ? 'Görev başarıyla güncellendi!' : 'Görev başarıyla eklendi!');
            setShowTaskForm(false);
            setEditingTask(null);  // Düzenleme modunu kapat
            fetchTasks();
            resetForm();

        } catch (err) {
            console.error('Hata:', err);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };


    // Görev silme
    const handleDeleteTask = async (taskID) => {
        if (!taskID) {
            console.error('Silinecek görev ID\'si bulunamadı');
            return;
        }

        if (window.confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
            try {
                const res = await fetch(`https://localhost:7120/api/Task/${taskID}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    }
                });

                if (res.ok) {
                    alert('Görev silindi!');
                    fetchTasks();
                } else {
                    const errorData = await res.json();
                    alert(errorData.message || 'Görev silinirken bir hata oluştu.');
                }
            } catch (err) {
                console.error('Görev silinirken hata:', err);
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }
    };

    // Görev durumunu güncelleme
    const handleStatusChange = async (taskID, newStatus) => {
        try {
            if (!taskID) {
                alert('Görev bulunamadı!');
                return;
            }

            const res = await fetch(`https://localhost:7120/api/Task/${taskID}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ Status: newStatus }), 
            });

            if (res.ok) {
                fetchTasks();
            } else {
                const errorData = await res.json();
                alert(errorData.message || 'Durum güncellenirken bir hata oluştu.');
            }
        } catch (err) {
            console.error('Durum güncellenirken hata:', err);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    // Form sıfırlama
    const resetForm = () => {
        setNewTask({
            title: '',
            description: '',
            dueDate: new Date().toISOString().split('T')[0],
            priority: 'normal',
            status: 'pending'
        });
    };

    // Görev düzenleme
    const handleEditTask = (task) => {
        setEditingTask(task);
        setNewTask({
            title: task.taskName,
            description: task.description,
            dueDate: task.dueDate.split('T')[0],
            priority: task.priority,
            status: task.status
        });
        setShowTaskForm(true);
    };

    // Filtreleme ve sıralama
    const filteredTasks = tasks
        .filter(task => {
            if (!task) return false;
            if (filter === 'all') return true;
            if (filter === 'pending') return task.status === 'pending';
            if (filter === 'completed') return task.status === 'completed';
            return true;
        })
        .filter(task => 
            task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'dueDate') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            if (sortBy === 'priority') {
                const priorityOrder = { high: 0, normal: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return a.taskName.localeCompare(b.taskName);
        });

    return (
        <div className="task-container">
            <div className="task-header">
                <h1>Görevlerim</h1>
                <button
                    className="add-task-button"
                    onClick={() => {
                        setEditingTask(null);
                        resetForm();
                        setShowTaskForm(true);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} /> Yeni Görev
                </button>
            </div>

            <div className="task-controls">
                <div className="search-box">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                        type="text"
                        placeholder="Görev ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-sort-controls">
                    <div className="filter-group">
                        <FontAwesomeIcon icon={faFilter} />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">Tümü</option>
                            <option value="pending">Bekleyen</option>
                            <option value="completed">Tamamlanan</option>
                        </select>
                    </div>

                    <div className="sort-group">
                        <FontAwesomeIcon icon={faSort} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="dueDate">Tarihe Göre</option>
                            <option value="priority">Önceliğe Göre</option>
                            <option value="title">Başlığa Göre</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="task-list">
                {filteredTasks.map(task => (
                    <div 
                        key={task.taskID} 
                        className={`task-card ${task.status === 'completed' ? 'completed' : ''} priority-${task.priority}`}
                    >
                        <div className="task-header">
                            <h3>{task.taskName}</h3>
                            <div className="task-actions">
                                <button 
                                    className="action-button edit"
                                    onClick={() => handleEditTask(task)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button 
                                    className="action-button delete"
                                    onClick={() => handleDeleteTask(task.taskID)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button 
                                    className={`action-button complete ${task.status === 'completed' ? 'completed' : ''}`}
                                    onClick={() => handleStatusChange(
                                        task.taskID, 
                                        task.status === 'completed' ? 'pending' : 'completed'
                                    )}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                            </div>
                        </div>
                        
                        <p className="task-description">{task.description}</p>
                        
                        <div className="task-footer">
                            <div className="task-meta">
                                <span className="due-date">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                                </span>
                                <span className="priority">
                                    <FontAwesomeIcon icon={faClock} />
                                    {task.priority === 'high' ? 'Yüksek' : 
                                     task.priority === 'normal' ? 'Normal' : 'Düşük'}
                                </span>
                            </div>
                            <span className={`status-badge ${task.status}`}>
                                {task.status === 'completed' ? 'Tamamlandı' : 'Bekliyor'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>


            {showTaskForm && (
                <div className="task-form-modal">
                    <div className="task-form-content">
                        <h2>{editingTask ? 'Görevi Düzenle' : 'Yeni Görev'}</h2>
                        <form onSubmit={handleTaskSubmit}>
                            <div className="form-group">
                                <label>Başlık</label>
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    required
                                    placeholder="Görev başlığı"
                                />
                            </div>

                            <div className="form-group">
                                <label>Açıklama</label>
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    required
                                    placeholder="Görev açıklaması"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Bitiş Tarihi</label>
                                    <input
                                        type="date"
                                        value={newTask.dueDate}
                                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Öncelik</label>
                                    <select
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    >
                                        <option value="low">Düşük</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">Yüksek</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-buttons">
                                <button type="submit" className="submit-button">
                                    {editingTask ? 'Güncelle' : 'Kaydet'}
                                </button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => {
                                        setShowTaskForm(false);
                                        setEditingTask(null);
                                        resetForm();
                                    }}
                                >
                                    İptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;