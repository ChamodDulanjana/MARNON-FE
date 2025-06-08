import {BrowserRouter} from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import {AuthContextProvider} from "./context/authContext.tsx";
import AppRoutes from "./AppRoutes.tsx";

function App() {
    return (
        <section className="w-full h-full overflow-y-hidden">
            <BrowserRouter>
                <HeroUIProvider>
                    <ToastProvider/>
                    <AuthContextProvider>
                        <AppRoutes />
                    </AuthContextProvider>
                </HeroUIProvider>
            </BrowserRouter>
        </section>
    )
}

export default App;
