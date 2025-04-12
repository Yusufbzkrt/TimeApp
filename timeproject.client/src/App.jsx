import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Auth/login';
import Register from './Auth/Register';
import UserLayout from './User/UserLayout';
import HomePage from './HomePage/HomePage';
import UserHomePage from "./User/UserHomePage";
import MyBlog from "./User/MyBlog";
import MyContact from "./User/MyContact";
import MyHelp from "./User/MyHelp";
import MyServices from "./User/MyServices";
import EditEtkinlik from './User/EditEtkinlik';
import MyContactEdit from "./User/MyContactEdit";
import Etkinlikler from "./User/Etkinlikler";
import About from "./HomePage/About";
import MessageComponent from "./Messages/MessageComponent";

function App() {
    return (
        <Router>
            <Routes>
                {/* Ana sayfa */}
                <Route path="/" element={<HomePage />} />

                {/* Giriş yapma sayfası */}
                <Route path="/login" element={<Login />} />

                {/* Kayıt olma sayfası */}
                <Route path="/register" element={<Register />} />

                <Route path="/chat" element={<MessageComponent />} />
                {/* Mesaj gönderme sayfası */}
                <Route path="/about" element={<About />} />

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
