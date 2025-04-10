import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Auth/login';
import Register from './Auth/Register';
import HomePage from './HomePage/HomePage';
import MessageList from "./Message/MessageList"; // Mesaj listesi bileþeni
import SendMessageForm from "./Message/SendMessageForm"; // Mesaj gönderme formu bileþeni
import UserHomePage from "./User/UserHomePage";
import MyBlog from "./User/MyBlog";
import MyContact from "./User/MyContact";
import MyHelp from "./User/MyHelp";
import MyServices from "./User/MyServices";
import MyContactEdit from "./User/MyContactEdit";
import Etkinlikler from "./User/Etkinlikler";

function App() {
    return (
        <Router>
            <Routes>
                {/* Ana sayfa */}
                <Route path="/" element={<HomePage />} />

                {/* Giriþ yapma sayfasý */}
                <Route path="/login" element={<Login />} />

                {/* Kayýt olma sayfasý */}
                <Route path="/register" element={<Register />} />

                {/* Mesajlar sayfasý */}
                <Route path="/messages" element={<MessageList userId={1} />} /> {/* userId dinamik olabilir */}

                {/* Mesaj gönderme sayfasý */}
                <Route path="/send-message" element={<SendMessageForm senderId={1} receiverId={2} />} /> {/* Örnek ID'ler */}


                <Route path="/UserHomePage" element={<PrivateRoute element={UserHomePage} />} />

                <Route path="/MyBlog" element={<PrivateRoute element={MyBlog} />} />

                <Route path="/MyContact" element={<PrivateRoute element={MyContact} />} />

                <Route path="/MyHelp" element={<PrivateRoute element={MyHelp} />} />

                <Route path="/MyServices" element={<PrivateRoute element={MyServices} />} />
                <Route path="/MyContactEdit" element={<PrivateRoute element={MyContactEdit} />} />
                <Route path="/Etkinlikler" element={<PrivateRoute element={Etkinlikler} />} />
            </Routes>
        </Router>
    );
}

export default App;
