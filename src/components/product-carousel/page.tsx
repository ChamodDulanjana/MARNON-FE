import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {ProductProp} from "@/components/productGrid/page.tsx";
import {Link} from "react-router-dom";

type ProductCarouselProp = {
    products: ProductProp[];
    carouselItemStyle: string;
}

const ProductCarousel = ({products, carouselItemStyle} : ProductCarouselProp) => {
    return (
        <div className="w-full mt-10 min-[2560px]:mt-12">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {products.map((product: ProductProp, index: number) => (
                        <CarouselItem key={index} className={carouselItemStyle}>
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
    );
};

export default ProductCarousel;