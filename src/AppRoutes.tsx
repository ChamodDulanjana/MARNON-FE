import Header from './layouts/header/page'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ShopCategory from './pages/shopCategory'
import ProductDisplay from './pages/product'
import Footer from './layouts/footer/page'
import Checkout from "@/pages/checkout.tsx";

const AppRoutes = () => {
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