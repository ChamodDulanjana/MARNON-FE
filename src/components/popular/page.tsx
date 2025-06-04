import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../ui/carousel";
import {getAllProducts} from "@/services/productService.ts";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";

type ProductProp = {
    id: number,
    name: string,
    description: string,
    oldPrice: number,
    newPrice: number,
    color: string,
    image: string,
    isActive: boolean,
    createBy: string,
    modifyBy: string,
    createDate: string,
    modifyDate: string
}

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
        <div className="w-full min-h-screen flex flex-col items-start justify-start bg-white py-16 px-4 lg:px-10 xl:px-20 font-poppins min-[2560px]:py-28">
            <h1 className="text-xl lg:text-3xl min-[2560px]:text-5xl font-bold whitespace-nowrap mb-4 min-[2560px]:mb-8">Popular Items</h1>
            <p className='text-[12px] lg:text-sm min-[2560px]:text-xl w-full sm:w-[448px] min-[2560px]:w-[630px] leading-5 text-justify'>
                Explore our most-loved styles in one place. From best-selling outfits to must-have accessories,
                discover what everyone’s talking about and upgrade your look with the trendiest picks.
            </p>

            {/*Product carousel*/}
            <div className="w-full mt-10 min-[2560px]:mt-12">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {products.map((product: ProductProp, index: number) => (
                            <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 lg:basis-1/4 ">
                                <Link to={`/product/${product.id}`} key={index} onClick={() =>{
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: 'auto'  // Optional: 'auto' or 'smooth'
                                    });
                                }}>
                                    <div
                                        key={index}
                                        className='w-full flex flex-col relative'
                                    >
                                        <div
                                            className='w-full h-[300px] min-[470px]:h-[400px] min-[600px]:h-[500px] 2xl:h-[600px] min-[2560px]:h-[900px]  rounded-md  bg-center bg-cover'
                                            style={{
                                                backgroundImage: `url(${product.image})`,
                                            }}
                                        ></div>
                                        <h3 className='font-medium font-poppins mt-3 text-[13px] lg:text-sm min-[2560px]:text-2xl min-[2560px]:mt-6'>
                                            {product.name}
                                        </h3>
                                        <h4 className='text-[14px] min-[2560px]:text-[22px] mt-2 text-gray-500 font-poppins font-medium'>
                                            LKR {product.newPrice}
                                        </h4>
                                        <div className='w-6 h-6 border-2 rounded-full border-gray-300 mt-1 p-1 absolute bottom-0 min-[2560px]:w-10  min-[2560px]:h-10 min-[2560px]:border-gray-500 min-[2560px]:p-2'>
                                            <div
                                                className="w-full h-full rounded-full border border-gray-300"
                                                style={{ backgroundColor: product.color }}
                                            ></div>
                                        </div>
                                        <div className='bg-white w-10 h-9 min-[2560px]:h-14'></div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </div>
    );
};

export default Popular;