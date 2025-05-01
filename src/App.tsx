import Home from "./pages/home/page.tsx";
import Header from "./layouts/header/page.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShopCategory from "./pages/shopCategory/page.tsx";
import { HeroUIProvider } from "@heroui/react";
import ProductDisplay from "./pages/productDisplay/page.tsx";

function App() {

  return (
    <section className="w-full h-full">
        <BrowserRouter>
            <HeroUIProvider>
                <Header />
                <div className='mt-[70px]'>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/men" element={<ShopCategory category={"men"}/>}/>
                        <Route path="/women" element={<ShopCategory category={"women"}/>}/>
                        <Route path="/kids" element={<ShopCategory category={"kid"}/>}/>
                        <Route path="/product" element={<ProductDisplay/>}>
                            <Route path=":productId" element={<ProductDisplay/>}/>
                        </Route>

                    </Routes>
                </div>
            </HeroUIProvider>
        </BrowserRouter>
    </section>
  )
}

export default App
