import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '../constants/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextData {
    user: User | null;
    loading: boolean;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const saveSession = async (token: string, userData: User) => {
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@user', JSON.stringify(userData));
        setUser(userData);
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            if (!res.ok) {
                const err = await res.json();
                return Alert.alert('Erro', err.error || 'Falha no cadastro');
            }
            const { token, user: userData } = await res.json();
            await saveSession(token, userData);
        } catch (e) {
            console.error(e);
            Alert.alert('Erro', 'Não foi possível cadastrar.');
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const err = await res.json();
                return Alert.alert('Erro', err.error || 'Credenciais inválidas');
            }
            const { token, user: userData } = await res.json();
            await saveSession(token, userData);
        } catch (e) {
            console.error(e);
            Alert.alert('Erro', 'Não foi possível entrar.');
        }
    };

    const logout = async () => {
        await AsyncStorage.multiRemove(['@token', '@user']);
        setUser(null);
    };

    useEffect(() => {
        (async () => {
            const [[, token], [, userJson]] = await AsyncStorage.multiGet(['@token', '@user']);
            if (token && userJson) setUser(JSON.parse(userJson));
            setLoading(false);
        })();
    }, []);

    return <AuthContext.Provider value={{ user, loading, register, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
