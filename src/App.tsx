import Home from "./pages/home.tsx";
import Header from "./layouts/header/page.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShopCategory from "./pages/shopCategory.tsx";
import { HeroUIProvider } from "@heroui/react";
import ProductDisplay from "./pages/product.tsx";

function App() {

  return (
    <section className="w-full h-full">
        <BrowserRouter>
            <HeroUIProvider>
                <Header />
                <div className='mt-[70px]'>
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
            </HeroUIProvider>
        </BrowserRouter>
    </section>
  )
}

export default App;
