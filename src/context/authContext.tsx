import {createContext, useContext, useState} from "react";
import * as React from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    userName: string;
    setUserName: (value: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!sessionStorage.getItem("accessToken"));
    const [userName, setUserName] = useState<string>(sessionStorage.getItem('userName') || '');

    const contextValue: AuthContextType = { isLoggedIn, setIsLoggedIn, userName, setUserName };

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