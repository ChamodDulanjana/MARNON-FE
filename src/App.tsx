import Home from "./pages/home/page.tsx";
import Header from "./layouts/header/page.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShopCategory from "./pages/shopCategory/page.tsx";


function App() {

  return (
    <section className="w-full h-full">
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/men" element={<ShopCategory category={"men"}/>}/>
                <Route path="/women" element={<ShopCategory category={"women"}/>}/>
                <Route path="/kids" element={<ShopCategory category={"kid"}/>}/>

            </Routes>
        </BrowserRouter>
    </section>
  )
}

export default App
