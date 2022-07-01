import React from 'react'
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const authInfo = localStorage.getItem('profile');
    const authObject = JSON.parse(authInfo);
    const email = authObject.result.email;

    return email ? children : <Navigate to="/Login" />;
}

export default PrivateRoute