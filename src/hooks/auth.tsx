import React, { createContext, useContext, useState } from "react";
import * as AuthSessions from 'expo-auth-session';
import { api } from "../services/api";

const CLIENT_ID = 'd8f2c6e7baba9ead8000';
const SCOPE = 'read:user';

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthContextData = {
    user: User | null;
    isSignIn: boolean;
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
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const [isSignIn, setIsSignIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    
    async function sigIn() {
        setIsSignIn(true);
        
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
        const { params } = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

        if(params && params.code) {
            const authResponse = await api.post('/authenticate', { code: params.code });
            console.log(authResponse.data);
            
            const { token, user } = authResponse.data as AuthResponse;
        }

        setIsSignIn(false);
    }

    async function sigOut() {}
    
    return (
        <AuthContext.Provider value={{ sigIn, sigOut, user, isSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };