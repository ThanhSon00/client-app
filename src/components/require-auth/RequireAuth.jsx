import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

export function RequireAuth() {
    const location = useLocation();
    const { authLogin } = useContext(false);
  
    if (authLogin === undefined) {
      return null; // or loading indicator/spinner/etc
    }
  
    return authLogin 
      ? <Outlet />
      : <Navigate to="/login" replace state={{ from: location }} />;
  }