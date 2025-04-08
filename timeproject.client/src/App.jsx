import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Auth/login';
import Register from './Auth/Register';
import HomePage from './HomePage/HomePage';
import MessageList from "./Message/MessageList"; // Mesaj listesi bile�eni
import SendMessageForm from "./Message/SendMessageForm"; // Mesaj g�nderme formu bile�eni
import UserHomePage from "./Admin/UserHomePage";
import MyBlog from "./Admin/MyBlog";
import MyContact from "./Admin/MyContact";
import MyHelp from "./Admin/MyHelp";
import MyServices from "./Admin/MyServices";
import MyContactEdit from "./Admin/MyContactEdit";

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

                {/*<PrivateRoute path="/" exact component={UserHomePage} /> */}

                <Route path="/UserHomePage" element={<PrivateRoute element={UserHomePage} />} />

                <Route path="/MyBlog" element={<PrivateRoute element={MyBlog} />} />

                <Route path="/MyContact" element={<PrivateRoute element={MyContact} />} />

                <Route path="/MyHelp" element={<PrivateRoute element={MyHelp} />} />

                <Route path="/MyServices" element={<PrivateRoute element={MyServices} />} />
                <Route path="/MyContactEdit" element={<PrivateRoute element={MyContactEdit} />} />


            </Routes>
        </Router>
    );
}

export default App;
