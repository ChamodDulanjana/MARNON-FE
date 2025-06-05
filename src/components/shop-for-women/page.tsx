import {useQuery} from "@tanstack/react-query";
import {getProductsByCategoryAndCount} from "@/services/productService.ts";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";
import ProductCarousel from "@/components/product-carousel/page.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {getHomeDisplayImgByType} from "@/services/homeDisplayImgService.ts";
import {useEffect, useState} from "react";

const carouselItemStyle = 'basis-1/2  md:basis-1/3 lg:basis-1/2 xl:basis-1/3';

const ShopForWomen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    const {
        isLoading: isProductsLoading,
        isError: isProductsError,
        data: products = [],      // default to an empty array
    } = useQuery({
        queryKey: ['Women'],
        queryFn: () => getProductsByCategoryAndCount('Women', 10),
    });

    useEffect(() => {
        // Fetching the home display image
        const fetchHomeDisplayImage = async () => {
            const response = await getHomeDisplayImgByType('women');

            if (response.statusCode === 200) {
                setImageUrl(response.data.imageUrl);
                setIsLoading(false);
            } else {
                setIsError(true);
            }
        }

        fetchHomeDisplayImage();
    }, []);

    useEffect(() => {
        setIsLoading(isProductsLoading);
        setIsError(isProductsError);

    }, [isProductsError, isProductsLoading]);

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="w-full h-full flex flex-col items-start justify-start bg-white py-8 lg:py-12 px-4 lg:px-10 xl:px-20 font-poppins min-[2560px]:py-28">
            <h1 className="text-xl lg:text-3xl min-[2560px]:text-5xl font-bold whitespace-nowrap mb-4 min-[2560px]:mb-8">Shop For Women</h1>
            <p className='text-[12px] lg:text-sm min-[2560px]:text-xl w-full sm:w-[448px] min-[2560px]:w-[630px] leading-5 text-justify'>
                Discover the latest in women's fashion with our exclusive collection. From chic dresses to stylish accessories, find everything you need to elevate your wardrobe.
            </p>
            <Button className='mt-5 min-[2560px]:mt-8 min-[2560px]:h-14 min-[2560px]:w-36'>
                <Link to='/women'>
                    <span className="text-xs lg:text-sm min-[2560px]:text-lg font-semibold">Shop Now</span>
                </Link>
            </Button>

            <div className="w-full h-fit flex flex-col lg:flex-row py-10 gap-4">
                {/*Img area*/}
                <div className="max-lg:w-full aspect-video bg-cover bg-center rounded-lg shadow-lg w-[776px] min-[2560px]:my-12 min-[2560px]:w-[1600px] "
                     style={{backgroundImage: `url(${imageUrl})`}}>

                </div>
                {/*Product carousel*/}
                <ProductCarousel products={products} carouselItemStyle={carouselItemStyle} />
            </div>
        </div>
    );
};

export default ShopForWomen;