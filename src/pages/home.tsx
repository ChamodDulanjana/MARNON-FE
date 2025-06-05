import Hero from "../components/hero/page.tsx";
import Popular from "../components/popular/page.tsx";
import landing_image from "../assets/img/landing_image.png"
import NewArrivals from "@/components/new-arrivals/page.tsx";
import ShopForMen from "@/components/shop-for-men/page.tsx";
import ShopForWomen from "@/components/shop-for-women/page.tsx";
import ShopForKids from "@/components/shop-for-kids/page.tsx";
import {useEffect} from "react";

const Home = () => {

    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo({
            top: -1,
            left: 0,
            behavior: 'auto'
        })
    }, []);

    return (
        <div 
            className="w-full min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${landing_image})` }}
        >
            <Hero />
            <div className='w-full h-full bg-white'>
                <Popular />
                <NewArrivals />
                <ShopForMen />
                <ShopForWomen />
                <ShopForKids />
            </div>
        </div>
    );
};

export default Home;