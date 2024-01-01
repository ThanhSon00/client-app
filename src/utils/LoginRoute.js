import React from 'react'

import { Navigate } from "react-router-dom"

const LoginRoute = ({children}) => {
    const token = localStorage.getItem('token');

    if(token) {
        return <Navigate to="/main-page/news/question" />
    }
    return children;
};

export default LoginRoute;