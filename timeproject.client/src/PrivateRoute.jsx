import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('authToken'); // Token'ý localStorage'dan kontrol et

    return token ? <Element {...rest} /> : <Navigate to="/login" />; // Token varsa sayfayý göster, yoksa login sayfasýna yönlendir
};

export default PrivateRoute;
