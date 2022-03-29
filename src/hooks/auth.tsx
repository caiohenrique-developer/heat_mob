import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSessions from 'expo-auth-session';
import { api } from "../services/api";

const CLIENT_ID = 'd8f2c6e7baba9ead8000';
const SCOPE = 'read:user';
const USER_STORAGE = '@HeatMob:user';
const TOKEN_STORAGE = '@HeatMob:token';

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthContextData = {
    user: User | null;
    isSigningIn: boolean;
    sigIn(): Promise<void>;
    sigOut(): Promise<void>;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

type AuthResponse = {
    token: string;
    user: User;
}

type AuthorizationResponse = {
    params: {
        code?: string;
        error?: string;
    },
    type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const [isSigningIn, setIsSigningIn] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    
    async function sigIn() {
        try {
            setIsSigningIn(true);
        
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
            const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;
    
            if(authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
                const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code });
                const { token, user } = authResponse.data as AuthResponse;
    
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
                await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));
    
                setUser(user);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsSigningIn(false);
        }
    }

    async function sigOut() {
        await AsyncStorage.removeItem(USER_STORAGE);
        await AsyncStorage.removeItem(TOKEN_STORAGE);
        setUser(null);
    }
    
    useEffect(() => {
        async function loadingStorageUserData() {
            const userStorage = await AsyncStorage.getItem(USER_STORAGE);
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

            if(userStorage && tokenStorage) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;

                setUser(JSON.parse(userStorage));
            }

            setIsSigningIn(false);
        }

        loadingStorageUserData();
    }, []);
    
    return (
        <AuthContext.Provider value={{ sigIn, sigOut, user, isSigningIn }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };