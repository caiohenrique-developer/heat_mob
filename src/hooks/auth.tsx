import React, { createContext, useContext, useState } from "react";
import * as AuthSessions from 'expo-auth-session';

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
    isSignIng: boolean;
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
    const [isSignIng, setIsSignIng] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    
    async function sigIn() {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
        const { params } = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

        console.log(params);        
    }

    async function sigOut() {}
    
    return (
        <AuthContext.Provider value={{ sigIn, sigOut, user, isSignIng }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };