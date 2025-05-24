import Hero from "../../components/hero/page.tsx";
import Popular from "../../components/popular/page.tsx";
import landing_image from "../../assets/img/landing_image.png"

const Home = () => {
    return (
        <div 
            className="w-full h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${landing_image})` }}
        >
            <Hero />
            <Popular />
        </div>
    );
};

export default Home;