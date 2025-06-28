import Header from './layouts/header/page'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ShopCategory from './pages/shopCategory'
import ProductDisplay from './pages/product'
import Footer from './layouts/footer/page'
import Checkout from "@/pages/checkout.tsx";
import {useLoadingContext} from "@/context/loadingContext.tsx";
import {useEffect} from "react";
import {setupAxiosInterceptors} from "@/api/axiosInstance.ts";

const AppRoutes = () => {
    const { setIsLoading } = useLoadingContext();

    // Set loading state for the query
    useEffect(() => {
        setupAxiosInterceptors(setIsLoading);
    }, [setIsLoading]);

  return (
    <>
        <Header />
        <div className='relative min-h-screen mt-[70px]'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:category" element={<ShopCategory />} />
                <Route path="/product" element={<ProductDisplay />}>
                    <Route path=":productId" element={<ProductDisplay />} />
                </Route>
                <Route path="/cart/checkout" element={<Checkout />} />
            </Routes>
        </div>
        <Footer />
    </>
  )
}

export default AppRoutes