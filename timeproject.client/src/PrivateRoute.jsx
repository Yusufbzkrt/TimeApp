import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('authToken'); // Token'� localStorage'dan kontrol et

    return token ? <Element {...rest} /> : <Navigate to="/login" />; // Token varsa sayfay� g�ster, yoksa login sayfas�na y�nlendir
};

export default PrivateRoute;
