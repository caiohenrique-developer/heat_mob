import React, { createContext, useContext, useState } from "react";

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

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const [isSignIng, setIsSignIng] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    
    async function sigIn() {}

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