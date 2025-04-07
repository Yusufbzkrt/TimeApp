import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/login';
import Register from './Auth/Register';
import HomePage from './HomePage/HomePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register /> }></Route>
            </Routes>
        </Router>
    );
}

export default App;