import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash, faSearch, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import './MessageComponent.css';
import { useNavigate } from 'react-router-dom';

const MessageComponent = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const connectionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const authToken = localStorage.getItem('authToken');
            const userId = localStorage.getItem('userId');
            
            if (!authToken || !userId) {
                console.log('Auth bilgileri eksik:', { authToken, userId });
                setError('Oturum açmanız gerekiyor');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                return false;
            }
            return true;
        };

        const fetchUsers = async () => {
            try {
                if (!checkAuth()) return;

                const authToken = localStorage.getItem('authToken');
                const userId = localStorage.getItem('userId');

                console.log('API isteği başlatılıyor...');
                const response = await fetch('https://localhost:7120/api/user', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log('API yanıtı:', response.status);
                if (!response.ok) {
                    if (response.status === 401) {
                        console.log('401 Unauthorized hatası');
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('userId');
                        setError('Oturumunuz sona erdi. Lütfen tekrar giriş yapın');
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000);
                        return;
                    }
                    throw new Error(`Kullanıcılar alınamadı: ${response.status}`);
                }

                const data = await response.json();
                console.log('Alınan kullanıcı verileri:', data);
                
                // Kendi kullanıcısını listeden çıkar
                const filteredUsers = data.filter(user => user.id !== parseInt(userId));
                setUsers(filteredUsers);
                
                if (filteredUsers.length > 0) {
                    setSelectedUser(filteredUsers[0]);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Kullanıcı verileri alınırken hata:', error);
                setError(`Kullanıcılar yüklenirken bir hata oluştu: ${error.message}`);
                setIsLoading(false);
            }
        };

        const startSignalRConnection = async () => {
            try {
                if (!checkAuth()) return;

                const authToken = localStorage.getItem('authToken');
                const userId = localStorage.getItem('userId');

                console.log('SignalR bağlantısı başlatılıyor...');
                const connection = new HubConnectionBuilder()
                    .withUrl('https://localhost:7120/messageHub', {
                        accessTokenFactory: () => authToken,
                        skipNegotiation: true,
                        transport: 1 // WebSocket
                    })
                    .withAutomaticReconnect()
                    .build();

                connection.on("ReceiveMessage", (message) => {
                    console.log('Yeni mesaj alındı:', message);
                    setMessages(prev => [...prev, {
                        ...message,
                        id: Date.now(),
                        timestamp: new Date().toLocaleTimeString('tr-TR')
                    }]);
                });

                connection.onclose(error => {
                    console.error('SignalR bağlantısı kapandı:', error);
                    setError('Bağlantı kesildi. Yeniden bağlanılıyor...');
                });

                await connection.start();
                console.log("SignalR bağlantısı kuruldu.");
                connectionRef.current = connection;
                setError(null);
            } catch (err) {
                console.error("SignalR bağlantı hatası:", err);
                setError(`Mesajlaşma servisine bağlanılamadı: ${err.message}`);
                if (err.message.includes('401')) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userId');
                    setError('Oturumunuz sona erdi. Lütfen tekrar giriş yapın');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            }
        };

        fetchUsers();
        startSignalRConnection();

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
            }
        };
    }, [navigate]);

    const handleSendMessage = async () => {
        if (!selectedUser) {
            setError('Lütfen bir alıcı seçin');
            return;
        }

        const currentUserId = parseInt(localStorage.getItem("userId"));
        if (isNaN(currentUserId)) {
            setError('Geçersiz kullanıcı ID\'si');
            return;
        }

        if (!newMessage.trim()) {
            setError('Mesaj boş olamaz');
            return;
        }

        if (!connectionRef.current) {
            setError('Mesajlaşma servisine bağlı değilsiniz');
            return;
        }

        try {
            const messageContent = newMessage.trim();
            
            // Mesajı önce yerel state'e ekle
            const tempMessage = {
                id: Date.now(),
                text: messageContent,
                sender: 'me',
                timestamp: new Date().toLocaleTimeString('tr-TR'),
                user: selectedUser,
                status: 'sending'
            };
            
            setMessages(prev => [...prev, tempMessage]);
            setNewMessage('');
            setError(null);

            // Sunucuya gönder
            await connectionRef.current.invoke(
                "SendMessage",
                currentUserId,
                selectedUser.id,
                messageContent
            );

            // Mesaj durumunu güncelle
            setMessages(prev => prev.map(msg => 
                msg.id === tempMessage.id 
                    ? { ...msg, status: 'sent' }
                    : msg
            ));

        } catch (error) {
            console.error("Mesaj gönderilirken hata oluştu:", error);
            setError('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
            
            // Hata durumunda mesajı kaldır
            setMessages(prev => prev.filter(msg => msg.status !== 'sending'));
        }
    };

    const handleDeleteMessage = (messageId) => {
        setMessages(messages.filter(message => message.id !== messageId));
    };

    const filteredMessages = messages.filter(message =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="message-loading">
                <div className="loading-spinner"></div>
                <p>Mesajlar yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="message-container">
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <div className="message-sidebar">
                <div className="sidebar-header">
                    <h2>Mesajlar</h2>
                    <div className="search-container">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Mesajlarda ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>
                <div className="user-list">
                    {users.length > 0 ? (
                        users.map(user => (
                            <div
                                key={`user-${user.id}`}
                                className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
                                onClick={() => setSelectedUser(user)}
                            >
                                <img src={user.avatar || 'https://i.pravatar.cc/150?img=1'} alt={user.name} className="user-avatar" />
                                <div className="user-info">
                                    <span className="user-name">{user.name}</span>
                                    <span className="last-message">Son mesaj...</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-users">
                            <p>Kullanıcı bulunamadı</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="message-content">
                {selectedUser ? (
                    <>
                        <div className="message-header">
                            <div className="current-user">
                                <img src={selectedUser.avatar || 'https://i.pravatar.cc/150?img=1'} alt={selectedUser.name} className="header-avatar" />
                                <span className="header-name">{selectedUser.name}</span>
                            </div>
                        </div>
                        <div className="message-list">
                            {filteredMessages.map(message => (
                                <div 
                                    key={`message-${message.id}`}
                                    className={`message-bubble ${message.sender} ${message.status || 'sent'}`}
                                >
                                    <div className="message-text">{message.text}</div>
                                    <div className="message-meta">
                                        <span className="message-time">
                                            <FontAwesomeIcon icon={faClock} /> {message.timestamp}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteMessage(message.id)}
                                            className="delete-button"
                                            title="Mesajı sil"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Mesajınızı yazın..."
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="send-button"
                                title="Mesajı gönder"
                                disabled={!selectedUser || !newMessage.trim()}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="no-selection">
                        <FontAwesomeIcon icon={faUser} className="no-selection-icon" />
                        <p>Görüşmek istediğiniz kişiyi seçin</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageComponent;
