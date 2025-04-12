import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Auth/login';
import Register from './Auth/Register';
import UserLayout from './User/UserLayout';
import HomePage from './HomePage/HomePage';
import MessageList from "./Message/MessageList"; // Mesaj listesi bile�eni
import SendMessageForm from "./Message/SendMessageForm"; // Mesaj g�nderme formu bile�eni
import UserHomePage from "./User/UserHomePage";
import MyBlog from "./User/MyBlog";
import MyContact from "./User/MyContact";
import MyHelp from "./User/MyHelp";
import MyServices from "./User/MyServices";
import EditEtkinlik from './User/EditEtkinlik';
import MyContactEdit from "./User/MyContactEdit";
import Etkinlikler from "./User/Etkinlikler";

function App() {
    return (
        <Router>
            <Routes>
                {/* Ana sayfa */}
                <Route path="/" element={<HomePage />} />

                {/* Giri� yapma sayfas� */}
                <Route path="/login" element={<Login />} />

                {/* Kay�t olma sayfas� */}
                <Route path="/register" element={<Register />} />

                {/* Mesajlar sayfas� */}
                <Route path="/messages" element={<MessageList userId={1} />} /> {/* userId dinamik olabilir */}

                {/* Mesaj g�nderme sayfas� */}
                <Route path="/send-message" element={<SendMessageForm senderId={1} receiverId={2} />} /> {/* �rnek ID'ler */}


                <Route path="mycontactedit" element={<MyContactEdit />} />

                <Route path="/user" element={<UserLayout />}>
                    <Route path="/user/home" element={<UserHomePage />} />
                    <Route path="/user/blog" element={<MyBlog />} />
                    <Route path="/user/iletisim" element={<MyContact />} />
                    <Route path="/user/yardim" element={<MyHelp />} />
                    <Route path="myservices" element={<MyServices />} />
                    <Route path="/user/etkinlikler" element={<Etkinlikler />} />
                    <Route path="/user/etkinlikler/duzenle/:eventsId" element={<EditEtkinlik />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
