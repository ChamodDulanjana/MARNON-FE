import Home from "./pages/home.tsx";
import Header from "./layouts/header/page.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShopCategory from "./pages/shopCategory.tsx";
import { HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import ProductDisplay from "./pages/product.tsx";
import {AuthContextProvider} from "./context/authContext.tsx";
import Footer from "./layouts/footer/page.tsx";

function App() {
    return (
        <section className="w-full h-full">
            <BrowserRouter>
                <HeroUIProvider>
                    <ToastProvider/>
                    <AuthContextProvider>
                        <Header/>
                        <div className='relative min-h-screen mt-[70px]'>
                            <Routes>
                                <Route path="/" element={<Home />}/>
                                <Route path="/:category" element={<ShopCategory/>}/>
                                <Route path="/:category" element={<ShopCategory/>}/>
                                <Route path="/:category" element={<ShopCategory/>}/>
                                <Route path="/product" element={<ProductDisplay/>}>
                                    <Route path=":productId" element={<ProductDisplay/>}/>
                                </Route>
                            </Routes>
                        </div>
                        <Footer/>
                    </AuthContextProvider>
                </HeroUIProvider>
            </BrowserRouter>
        </section>
    )
}

export default App;
