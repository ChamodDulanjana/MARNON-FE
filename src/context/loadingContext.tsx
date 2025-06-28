import React, { createContext, useContext, useState } from "react";
import LoadingAnimation from "@/components/loading-animation/page";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <LoadingAnimation />}
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => {
    const context = useContext(LoadingContext);
    if (!context) throw new Error("useLoading must be used within LoadingProvider");
    return context;
};
