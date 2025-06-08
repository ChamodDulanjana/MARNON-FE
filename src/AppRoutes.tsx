import Header from './layouts/header/page'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home'
import ShopCategory from './pages/shopCategory'
import ProductDisplay from './pages/product'
import AdminPanel from './pages/adminPanel'
import Footer from './layouts/footer/page'

const AppRoutes = () => {
    const location = useLocation();
    const isAdminPanel = location.pathname === "/admin-panel";
    
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
                    <Route path="/admin-panel" element={<AdminPanel />} />
                </Routes>
            </div>
            {!isAdminPanel && <Footer />}
        </>
  )
}

export default AppRoutes