import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash, faSearch, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import './MessageComponent.css';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../Notifications/NotificationContext'


import Layout from '../User/UserLayout';

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
    const selectedUserRef = useRef(null);

    const { addNotification } = useNotification();

    const checkAuth = useCallback(() => {
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
    }, [navigate, setError]);

    const fetchUsers = useCallback(async () => {
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
            console.log('Alınan kullanıcı verileri (API yanıtı):', data); // Bu logu iyi inceleyin

            const transformedUsers = data.map(user => ({
                id: user.userId, // 'userId'yı 'id'ye dönüştür
                name: user.name, // Diğer propertileri de kopyalayın
                email: user.email,
                avatar: user.avatar,
                lastMessageContent: user.lastMessageContent,
                lastMessageTimestamp: user.lastMessageTimestamp ? new Date(user.lastMessageTimestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : null,
                ...user
            }));

            const filteredUsers = transformedUsers.filter(user => user.id !== parseInt(userId));
            setUsers(filteredUsers); // Users state'ini güncelledik

            if (filteredUsers.length > 0 && !selectedUser) { // Eğer henüz bir kullanıcı seçilmemişse, ilkini seç
                setSelectedUser(filteredUsers[0]); // İlk filtrelenmiş kullanıcıyı seç
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Kullanıcı verileri alınırken hata:', error);
            setError(`Kullanıcılar yüklenirken bir hata oluştu: ${error.message}`);
            setIsLoading(false);
        }
    }, [checkAuth, navigate, setUsers, setSelectedUser, setIsLoading, setError, selectedUser]);


    const fetchMessagesForSelectedUser = useCallback(async (currentUserId, targetUserId) => {
        if (!currentUserId || !targetUserId) {
            setMessages([]);
            return;
        }

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error("Mesajları çekerken kimlik bilgisi eksik.");
            return;
        }

        try {
            console.log(`Mesajlar çekiliyor: Current: ${currentUserId}, Target: ${targetUserId}`);
            const response = await fetch(`https://localhost:7120/api/message/${currentUserId}/${targetUserId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userId');
                    setTimeout(() => navigate('/login'), 2000);
                    return;
                }
                throw new Error(`Mesajlar alınamadı: ${response.status}`);
            }

            const data = await response.json();
            console.log('API\'den alınan mesajlar:', data); // Burayı tekrar kontrol edin!

            const storedCurrentUserId = parseInt(localStorage.getItem("userId"));

            const formattedMessages = data.map(msg => ({
                id: msg.messagesId, // Bu doğru!
                text: msg.messageContent, // <<<<<<<< DÜZELTME: BÜYÜK M
                sender: (msg.senderUserId === storedCurrentUserId) ? 'me' : 'other', // <<<<<<<< DÜZELTME: BÜYÜK S
                timestamp: new Date(msg.SendAt).toLocaleTimeString('tr-TR'), // <<<<<<<< DÜZELTME: BÜYÜK S
                status: msg.isRead ? 'read' : 'sent' // <<<<<<<< DÜZELTME: BÜYÜK I
            }));

            setMessages(formattedMessages);
        } catch (error) {
            console.error('Mesajlar yüklenirken hata:', error);
            setError(`Mesajlar yüklenemedi: ${error.message}`);
        }
    }, [navigate, setMessages, setError]);


  const startSignalRConnection = useCallback(async () => {
        try {
            if (!checkAuth()) return;

            const authToken = localStorage.getItem('authToken');
            const storedCurrentUserId = parseInt(localStorage.getItem('userId'));

            console.log('SignalR bağlantısı başlatılıyor...');
            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost:7120/messageHub', {
                    accessTokenFactory: () => authToken,
                    skipNegotiation: true,
                    transport: 1 // WebSocket
                })
                .withAutomaticReconnect()
                .build();

            // Hub'dan gelen parametreleri ve bildirim mantığını burada güncelliyoruz
            // Varsayım: Hub'dan messageId, senderUserId, receiverUserId, messageContent, sendAt, isRead geliyor
            connection.on("ReceiveMessage", (messageId, senderUserIdFromHub, receiverUserIdFromHub, messageContent, sendAt, isRead) => {
                console.log('Yeni mesaj alındı (Hub):', { messageId, senderUserIdFromHub, receiverUserIdFromHub, messageContent, sendAt, isRead });

                const currentSelectedUser = selectedUserRef.current; // useRef ile güncel seçili kullanıcıyı al

                // 1. Sohbet ekranını güncelleme mantığı
                if ((senderUserIdFromHub === storedCurrentUserId && receiverUserIdFromHub === currentSelectedUser?.id) ||
                    (senderUserIdFromHub === currentSelectedUser?.id && receiverUserIdFromHub === storedCurrentUserId)) {

                    setMessages(prev => {
                        const existingMessageIndex = prev.findIndex(msg =>
                            msg.sender === 'me' &&
                            msg.status === 'sending' &&
                            msg.text === messageContent
                        );

                        if (existingMessageIndex !== -1) {
                            const updatedMessages = [...prev];
                            updatedMessages[existingMessageIndex] = {
                                ...updatedMessages[existingMessageIndex],
                                id: messageId,
                                status: isRead ? 'read' : 'sent',
                                timestamp: new Date(sendAt).toLocaleTimeString('tr-TR')
                            };
                            return updatedMessages;
                        } else {
                            return [...prev, {
                                id: messageId,
                                text: messageContent,
                                sender: (senderUserIdFromHub === storedCurrentUserId) ? 'me' : 'other',
                                timestamp: new Date(sendAt).toLocaleTimeString('tr-TR'),
                                status: isRead ? 'read' : 'sent'
                            }];
                        }
                    });
                }

                // 2. Bildirim gönderme mantığı
                if (receiverUserIdFromHub === storedCurrentUserId && senderUserIdFromHub !== currentSelectedUser?.id) {
                    const senderUser = users.find(u => u.id === senderUserIdFromHub);
                    if (senderUser) {
                        addNotification({
                            type: 'message',
                            title: `Yeni Mesaj: ${senderUser.name}`,
                            message: messageContent,
                            time: new Date(sendAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                        });
                    }
                }
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
    }, [checkAuth, navigate, setMessages, setError, addNotification, users]); 


    useEffect(() => {
        const init = async () => {
            await fetchUsers(); // Bu zaten çağırılıyor
            // startSignalRConnection burada doğrudan çağrılmamalı, çünkü o kendi bağımlılıklarına göre yönetilecek
        };
        init();
    }, [fetchUsers]);
    useEffect(() => {
    const currentUserId = parseInt(localStorage.getItem('userId'));
    if (currentUserId && selectedUser) {
        fetchMessagesForSelectedUser(currentUserId, selectedUser.id);
    }
}, [selectedUser, fetchMessagesForSelectedUser]);


     useEffect(() => {
        startSignalRConnection(); // Bağlantıyı başlat
        return () => {
            if (connectionRef.current) {
                console.log("Component kaldırılıyor, SignalR bağlantısı durduruluyor.");
                connectionRef.current.stop();
            }
        };
    }, [startSignalRConnection]); 

    useEffect(() => {
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);

    const handleSendMessage = useCallback(async () => {
        console.log('2. handleSendMessage başlıyor...');
        if (!selectedUser) {
            setError('Lütfen bir alıcı seçin');
            console.log('2a. Hata: Alıcı seçilmedi.');
            return;
        }

        const currentUserId = parseInt(localStorage.getItem("userId"));
        console.log("2b. currentUserId (parsed):", currentUserId);
          const message = {
        senderUserId: currentUserId,
        receiveUserId: selectedUser.id,
        text: newMessage.text,
        sendAt: new Date().toISOString(),
    };


        // Yeni kontrol: selectedUser.id'nin varlığını kontrol edin
        if (!selectedUser.id) {
            setError('Seçilen alıcının ID\'si bulunamadı.');
            console.log('2x. Hata: selectedUser.id bulunamadı. selectedUser objesi:', selectedUser); // EKLE
            return;
        }

        if (!newMessage.trim()) {
            setError('Mesaj boş olamaz');
            console.log('2d. Hata: Mesaj boş.');
            return;
        }

        console.log('2e. connectionRef.current değeri:', connectionRef.current); // Mevcut
        if (!connectionRef.current || connectionRef.current.state !== 'Connected') {
            setError('Mesajlaşma servisine bağlı değilsiniz veya bağlantı kesildi');
            console.log('2f. Hata: Bağlantı servisi bağlı değil. Durum:', connectionRef.current?.state); // Mevcut
            return;
        }


        try {

            const messageContent = newMessage.trim();
            console.log("2g. Gönderilecek parametreler - currentUserId:", currentUserId, typeof currentUserId); // typeof ekle
            console.log("2g. Gönderilecek parametreler - selectedUser.id:", selectedUser.id, typeof selectedUser.id); // typeof ekle
            console.log("2g. Gönderilecek parametreler - messageContent:", messageContent, typeof messageContent); // typeof ekle


            // Mesajı önce yerel state'e ekle
            const tempMessage = {
                id:'temp-' + Date.now(),
                text: messageContent,
                sender: 'me',
                timestamp: new Date().toLocaleTimeString('tr-TR'),
                user: selectedUser,
                status: 'sending',
                createdAt: Date.now()
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
            console.log("2h. SendMessage invoke başarılı oldu.");

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
    }, [selectedUser, newMessage, connectionRef, setMessages, setNewMessage, setError]);

    const handleDeleteMessage = async (messageId) => {
        // 1. Geçici mesajların (örneğin: id'si "temp-12345" gibi olanlar) silinmesini engelle
        if (String(messageId).startsWith("temp-")) {
            alert("Bu mesaj henüz gönderilmediği için silinemez.");
            return;
        }

        const isConfirmed = window.confirm("Mesajı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.");
        if (!isConfirmed) {
            return;
        }

        // 2. UI'dan mesajı hemen kaldır
        setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId));

        // 3. Kimlik doğrulama kontrolü
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error("Mesaj silinirken kimlik bilgisi eksik.");
            alert('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
            navigate('/login');
            return;
        }

        // 4. Backend'e silme isteği gönder
        try {
            const response = await fetch(`https://localhost:7120/api/message/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                // Backend bir hata döndüyse kullanıcıya bildir
                console.error(`API hatası: ${response.status}`);
                alert('Mesaj silinemedi. Sunucu hatası oluştu.');
            } else {
                console.log(`Mesaj ${messageId} başarıyla silindi.`);
            }

        } catch (error) {
            console.error('Mesaj silinirken ağ hatası:', error);
            alert('Mesaj silinirken bir ağ hatası oluştu. Lütfen internet bağlantınızı kontrol edin.');
        }
    };


    const filteredMessages = messages.filter(message => {

        return message && message.text && message.text.toLowerCase().includes(searchTerm.toLowerCase());


    });

    if (isLoading) {
        return (
            <div className="message-loading">
                <div className="loading-spinner"></div>
                <p>Mesajlar yükleniyor...</p>
            </div>
        );
    }
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    };
    return (
        <div className="user-layout">
            <nav className="navbar">
                <ul>
                    <li><Link to="/user/home"><i className="fas fa-home"></i> Anasayfa</Link></li>
                    <li><Link to="/user/etkinlikler"><i className="fas fa-calendar-alt"></i> Etkinliklerim</Link></li>
                    <li><Link to="/user/iletisim"><i className="fas fa-envelope"></i> İletişim</Link></li>
                    <li><Link to="/user/yardim"><i className="fas fa-question-circle"></i> Yardım</Link></li>
                    <li><Link to="/user/blog"><i className="fas fa-blog"></i> Bloglarım</Link></li>
                    <li><Link to="/chat"><i className="fas fa-message"></i> Mesajlarım</Link></li>
                    <li className="logout">
                        <button onClick={handleLogout} className="logout-button">
                            <i className="fas fa-sign-out-alt"></i> Çıkış Yap
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="user-content">
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
                                        <img
                                            src={user.avatar ? `https://localhost:7120${user.avatar}` : 'https://i.pravatar.cc/150?img=1'}
                                            alt={user.name}
                                            className="user-avatar"
                                        />
                                        <div className="user-info">
                                            <span className="user-name">{user.name}</span>
                                            <span className="last-message">
                                                {user.lastMessageContent ? (
                                                    <>
                                                        {user.lastMessageContent.length > 20
                                                            ? user.lastMessageContent.substring(0, 20) + '...'
                                                            : user.lastMessageContent}
                                                        {user.lastMessageTimestamp && (
                                                            <span className="last-message-timestamp">
                                                                {' '}<br /> Tarih {user.lastMessageTimestamp}
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <small>Henüz mesaj yok.</small>
                                                )}
                                            </span>
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
                                        <img
                                            src={selectedUser.avatar ? `https://localhost:7120${selectedUser.avatar}` : 'https://i.pravatar.cc/150?img=1'}
                                            alt={selectedUser.name}
                                            className="header-avatar"
                                        />
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
            </main>

            <footer className="user-footer">
                <p>&copy; 2024 Time Bank. Tüm Hakları Saklıdır.</p>
            </footer>
        </div>
    );


};

export default MessageComponent;
