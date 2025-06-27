import {createContext, useContext} from "react";
import * as React from "react";
import {useDisclosure} from "@heroui/react";

interface ShopContextType {
    cartIsOpen: boolean;
    cartOnOpen: () => void;
    cartOnOpenChange: (isOpen: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopContextProvider = ({children}: { children: React.ReactNode }) => {
    const {isOpen: cartIsOpen, onOpen: cartOnOpen, onOpenChange: cartOnOpenChange} = useDisclosure();  // for cart drawer

    const contextValue: ShopContextType = { cartIsOpen, cartOnOpen, cartOnOpenChange };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShopContext = (): ShopContextType => {
    const context = useContext(ShopContext);
    if (!context) throw new Error("useShop must be used within an ShopProvider");
    return context;
};