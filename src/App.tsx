import {BrowserRouter} from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import {AuthContextProvider} from "./context/authContext.tsx";
import AppRoutes from "./AppRoutes.tsx";
import {Provider} from "react-redux";
import {persistor, store} from "@/redux/store.ts";
import { PersistGate } from 'redux-persist/integration/react';
import { ShopContextProvider } from "./context/shopContext.tsx";

function App() {
    return (
        <section className="w-full h-full overflow-y-hidden">
            <BrowserRouter>
                <HeroUIProvider>
                    <ToastProvider/>
                    <AuthContextProvider>
                        <ShopContextProvider>
                            <Provider store={store}>
                                <PersistGate loading={null} persistor={persistor}>
                                    <AppRoutes />
                                </PersistGate>
                            </Provider>
                        </ShopContextProvider>
                    </AuthContextProvider>
                </HeroUIProvider>
            </BrowserRouter>
        </section>
    )
}

export default App;
