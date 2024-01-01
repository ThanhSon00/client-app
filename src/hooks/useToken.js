import { useState } from 'react';

export default function useUser() {
    const getUser = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };
    const [user, setUser] = useState(getUser());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setUser(userToken);
    };
    
    return {
        setUser: saveToken,
        user
      }
}
