import {getAllProducts} from "@/services/productService.ts";
import {useQuery} from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";
import ProductCarousel from "@/components/product-carousel/page.tsx";

const carouselItemStyle = 'basis-1/2 sm:basis-1/3 lg:basis-1/4';

const Popular = () => {
    const {
        isLoading,
        isError,
        data: products = [],      // default to an empty array
    } = useQuery({
        queryKey: ['products'],
        queryFn: () => getAllProducts()
    });

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="w-full h-full flex flex-col items-start justify-start bg-white py-8 lg:py-12 px-4 lg:px-10 xl:px-20 font-poppins min-[2560px]:py-28">
            <h1 className="text-xl lg:text-3xl min-[2560px]:text-5xl font-bold whitespace-nowrap mb-4 min-[2560px]:mb-8 mt-6 lg:mt-12">Popular Items</h1>
            <p className='text-[12px] lg:text-sm min-[2560px]:text-xl w-full sm:w-[448px] min-[2560px]:w-[630px] leading-5 text-justify mb-8'>
                Explore our most-loved styles in one place. From best-selling outfits to must-have accessories,
                discover what everyone’s talking about and upgrade your look with the trendiest picks.
            </p>

            {/*Product carousel*/}
            <ProductCarousel products={products} carouselItemStyle={carouselItemStyle} />
        </div>
    );
};

export default Popular;