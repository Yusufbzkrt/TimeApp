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
import MyCalendar from "./User/calendar";
import MessageComponent from "./Messages/MessageComponent";
import { NotificationProvider } from './Notifications/NotificationContext';
import Calendar from './User/calendar';
import Task from './User/Task';
import MyBlogEdit from './User/MyBlogEdit';
import Ayarlar from './User/Ayarlar';
import Document from './User/Document';
import { ThemeProvider } from './context/ThemeContext';
import Report from './User/Reports';
import AllEvents from './HomePage/AllEvents';
import JoinForm from './HomePage/JoinForm';
import ResetPassword from './Auth/ResetPassword';
function App() {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/login" element={<Login />} />
                        
                        <Route path="/register" element={<Register />} />

                        <Route path="/chat" element={<MessageComponent />} />

                        <Route path="/about" element={<About />} />

                        <Route path="mycontactedit" element={<MyContactEdit />} />
                        <Route path="AllEvents" element={<AllEvents />} />
                        <Route path="/join/:eventId" element={<JoinForm />} />
                        <Route path="reset-password" element={<ResetPassword />} />



                        <Route path="/user" element={<UserLayout />}>
                            <Route path="/user/home" element={<UserHomePage />} />
                            <Route path="/user/blog" element={<MyBlog />} />
                            <Route path="/user/blog/edit/:blogId" element={<MyBlogEdit />} />
                            <Route path="/user/iletisim" element={<MyContact />} />
                            <Route path="/user/yardim" element={<MyHelp />} />
                            <Route path="myservices" element={<MyServices />} />
                            <Route path="/user/etkinlikler" element={<Etkinlikler />} />
                            <Route path="/user/etkinlikler/duzenle/:eventsId" element={<EditEtkinlik />} />
                            <Route path="/user/documents" element={<Document />} />
                            <Route path="/user/ayarlar" element={<Ayarlar />} />
                            <Route path="/user/calendar" element={<Calendar />} />
                            <Route path="/user/task" element={<Task />} />
                            <Route path="/user/reports" element={<Report />} />
                        </Route>
                    </Routes>
                </Router>
            </NotificationProvider>
        </ThemeProvider>
    );
}

export default App;
