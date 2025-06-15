import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {ProductProp} from "@/components/productGrid/page.tsx";
import {Link} from "react-router-dom";
import Autoplay from 'embla-carousel-autoplay';

type ProductCarouselProp = {
    products: ProductProp[];
    carouselItemStyle: string;
}

const ProductCarousel = ({products, carouselItemStyle} : ProductCarouselProp) => {
    return (
        <div className="w-full min-[2560px]:mt-12">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    direction: 'ltr', // simulates right-to-left
                }}
                plugins={[
                    Autoplay({
                        delay: 2000, // No delay between moves
                        stopOnMouseEnter: true, // Stop autoplay on mouse enter
                        stopOnInteraction: false,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent>
                    {products.map((product: ProductProp, index: number) => (
                        <CarouselItem key={index} className={`lg:pl-6 ${carouselItemStyle}`}>
                            <Link to={`/product/${product.id}`} key={index}>
                                <div
                                    key={index}
                                    className='w-full flex flex-col relative'
                                >
                                    <div
                                        className='w-full h-[200px] min-[340px]:h-[260px] min-[400px]:h-[300px] min-[480px]:h-[400px] min-[920px]:h-[440px] lg:h-[360px] xl:h-[400px] min-[1700px]:h-[550px] min-[2260px]:h-[740px]  rounded-md min-[2560px]:rounded-xl  bg-center bg-cover transition-all duration-300 ease-in-out'
                                        style={{
                                            backgroundImage: `url(${product.image})`,
                                        }}
                                    ></div>
                                    <h3 className='font-medium font-poppins mt-3 text-[13px] lg:text-sm min-[2560px]:text-2xl min-[2560px]:mt-6'>
                                        {product.name}
                                    </h3>
                                    <h4 className='text-[14px] min-[2560px]:text-[22px] mt-2 text-gray-500 font-poppins font-medium'>
                                        LKR {product.sellingPrice}
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
/*plugins={{
    navButtonsAlwaysVisible: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    /!*responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],*!/
}}*/