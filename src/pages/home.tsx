import Hero from "../components/hero/page.tsx";
import Popular from "../components/popular/page.tsx";
import landing_image from "../assets/img/landing_image.png"
import NewArrivals from "@/components/new-arrivals/page.tsx";
import ShopForMen from "@/components/shop-for-men/page.tsx";

const Home = () => {
    return (
        <div 
            className="w-full min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${landing_image})` }}
        >
            <Hero />
            <Popular />
            <NewArrivals />
            <ShopForMen />
        </div>
    );
};

export default Home;