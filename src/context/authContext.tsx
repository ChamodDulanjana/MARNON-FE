import {createContext, useContext, useState} from "react";
import * as React from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    userName: string;
    setUserName: (value: string) => void;
    role: string;
    setRole: (value: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!sessionStorage.getItem("userName"));
    const [userName, setUserName] = useState<string>(sessionStorage.getItem('userName') || '');
    const [role, setRole] = useState<string>(sessionStorage.getItem('role') || '');

    const contextValue: AuthContextType = { isLoggedIn, setIsLoggedIn, userName, setUserName, role, setRole };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};