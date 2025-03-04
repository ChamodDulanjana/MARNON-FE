import Hero from "../../components/hero/page.tsx";
import Popular from "../../components/popular/page.tsx";
import Header from "../../layouts/header/page.tsx";

const Home = () => {
    return (
        <div className="w-full h-screen bg-cover bg-center bg-fixed bg-[url('/src/assets/landing_image.png')]">
            <Header />
            <Hero />
            <Popular />
        </div>
    );
};

export default Home;