import Home from "./pages/home.tsx";
import Header from "./layouts/header/page.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShopCategory from "./pages/shopCategory.tsx";
import { HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import ProductDisplay from "./pages/product.tsx";
/*import {useEffect, useState} from "react";
import LoadingAnimation from "./components/loading-animation/page.tsx";*/
import {AuthContextProvider} from "./context/authContext.tsx";

function App() {
    /*const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handlePageLoad = () => {
            setIsLoaded(true);
        };

        if (document.readyState === "complete") {
            // Already loaded
            handlePageLoad();
        } else {
            // Wait for full load (including images/videos)
            window.addEventListener("load", handlePageLoad);
            return () => window.removeEventListener("load", handlePageLoad);
        }
    }, []);*/

    //if (!isLoaded) return <LoadingAnimation />;

  return (
    <section className="w-full h-full">
        <BrowserRouter>
            <HeroUIProvider>
                <ToastProvider />
                <AuthContextProvider>
                    <Header />
                    <div className='mt-[70px] h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar'>
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
                </AuthContextProvider>
            </HeroUIProvider>
        </BrowserRouter>
    </section>
  )
}

export default App;
