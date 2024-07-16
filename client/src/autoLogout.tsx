import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from './authContext';

const useAutoLogout = () => {
    const { logout } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const { exp }: any = jwtDecode(token);
            const timeout = exp * 1000 - Date.now();
            const timer = setTimeout(() => {
                logout();
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [logout]);
};

export default useAutoLogout;
