import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                const { exp, ...userId } = decoded;
                if (exp * 1000 > Date.now()) {
                    setIsAuthenticated(true);
                    fetchUserDetails(userId);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Failed to decode token', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const fetchUserDetails = async (userId: string) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/user/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user details', error);
        }
    };


    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decoded: any = jwtDecode(token);
        const { userId } = decoded;
        fetchUserDetails(userId);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
