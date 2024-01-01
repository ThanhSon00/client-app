import React from 'react'

import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    let location = useLocation();

    if(!token) {      
        return <Navigate to="/page/login" state={{ path: location.pathname }}  replace />
    }
    return children

};

export default ProtectedRoute;