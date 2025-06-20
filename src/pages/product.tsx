import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../services/productService.ts";
import {useQuery} from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import ZoomableImage from "@/components/zoomable-image/page.tsx";


type ProductType = {
    id: number,
    name: string,
    description: string,
    buyingPrice: number,
    sellingPrice: number,
    color: string,
    image: {
        id: number,
        image: string,
        type: string
    }[],
    size: {
        id: number,
        size: string,
        qty: number
    }[],
    category: {
        id: number,
        name: string
    }[]
}

const ProductDisplay = () => {
    const {productId} = useParams();
    const [selectedSize, setSelectedSize] = useState<string>("S");
    const [quantity, setQuantity] = useState<number>(1);
    const [mainImage, setMainImage] = useState("");

    const {
        isLoading,
        isError,
        data: product = {
            id: 0,
            name: "",
            description: "",
            buyingPrice: 0,
            sellingPrice: 0,
            color: "",
            image: [],
            size: [],
            category: [],
        },      // default to an empty object
    } = useQuery<ProductType>({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId)
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'  // Optional: 'auto' or 'smooth'
        })
    }, []);


    useEffect(() => {
        const defaultMainImg = product.image.filter(image => image.type === 'MAIN')[0]?.image || '';
        setMainImage(defaultMainImg);
    }, [product]);

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="flex flex-col items-center justify-center lg:flex-row gap-6 xl:gap-14 pt-3 md:pt-10 p-2 lg:px-16 lg:py-14 max-w-[2000px] mx-auto lg:items-start mb-10">
            {/* Left side: Images */}
            {/*Main image*/}
            <div className="flex flex-col gap-2 min-[425px]:flex-row">
                <div>
                    {product.image
                        .filter(img => img.type === 'MAIN')
                        .map((img, index) => (
                            <ZoomableImage
                                key={img.id}
                                src={mainImage}
                                alt={`main-image-${index}`}
                            />
                        ))
                    }
                </div>

                {/*Sub Images*/}
                <div className="flex min-[425px]:flex-col gap-1 items-center justify-center min-[425px]:justify-start">
                    {product.image
                        .map((img, index) => (
                            <img
                                key={img.id}
                                src={img.image}
                                alt={`sub-image-${index}`}
                                onClick={() => setMainImage(img.image)}
                                className="min-w-24 h-[150px] min-[375px]:w-28 object-cover border rounded-md cursor-pointer min-[425px]:w-28
                                min-[1600px]:h-[200px] min-[1600px]:w-36 min-[2560px]:h-[260px] min-[2560px]:w-48"
                            />
                        ))
                    }
                </div>

            </div>

            {/* Right side: Details */}
            <div className="flex-1 space-y-4 px-4 min-[425px]:px-10 lg:px-0 max-w-3xl min-[2560px]:space-y-8">
                <h1 className="text-lg font-semibold md:text-xl lg:text-2xl min-[2560px]:text-5xl">{product.name}</h1>
                <p className="text-[16px] md:text-[18px] font-medium text-gray-700 min-[2560px]:text-3xl">LKR {product.sellingPrice}</p>

                <p className="mt-4 text-sm text-gray-600 text-justify min-[2560px]:text-xl">{product.description}</p>

                <div className="mt-4 space-y-3">
                    {/*Color*/}
                    <div>
                        <span className="font-semibold min-[2560px]:text-xl">COLOR:
                            <span className='text-gray-600 font-normal ml-2'>{product.color}</span>
                        </span>
                        <div className='w-7 h-7 mt-2 flex items-center justify-center border border-gray-400  min-[2560px]:w-12 min-[2560px]:h-12'>
                            <div
                                className="w-5 h-5 border border-gray-300 min-[2560px]:w-8 min-[2560px]:h-8"
                                style={{ backgroundColor: product.color }}
                            ></div>
                        </div>
                    </div>

                    {/*Size*/}
                    <div className="pt-4 min-[2560px]:pt-8">
                        <span className="font-semibold min-[2560px]:text-xl">SIZE:</span> {selectedSize}
                        <div className="flex gap-3 mt-2">
                            {product.size.map((size, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSize(size.size)}
                                    className={`w-12 h-10 border border-gray-300 rounded min-[2560px]:w-20 min-[2560px]:h-14 min-[2560px]:text-xl ${
                                        selectedSize === size.size
                                            ? "bg-black text-white"
                                            : "bg-white text-black"
                                    }`}
                                >
                                    {size.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='flex gap-6 pt-6 min-[2560px]:pt-10 min-[2560px]:gap-10'>
                        {/*Quantity*/}
                        <div className="flex items-center \ min-[2560px]:text-xl">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="px-2 py-1 hover:bg-gray-200 border border-white hover:border-gray-200 min-[2560px]:px-4 min-[2560px]:py-4"
                            >−</button>
                            <span className="px-4 py-1 border border-gray-300 min-[2560px]:px-8 min-[2560px]:py-4">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="px-[6px] py-1 hover:bg-gray-200 border border-white hover:border-gray-200 min-[2560px]:px-[14px] min-[2560px]:py-4"
                            >＋</button>
                        </div>

                        {/*Add to Cart Button*/}
                        <button className="w-40 h-10 bg-black text-white font-semibold rounded flex items-center justify-center gap-2 min-[2560px]:w-72 min-[2560px]:h-16 min-[2560px]:text-xl">
                            <PiShoppingCartSimpleBold className='mr-2'/>
                            Add to Cart
                        </button>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1 pt-4 min-[2560px]:text-xl min-[2560px]:pt-8">
                        <p className="text-green-500 font-semibold"><span className="font-normal text-gray-500 mr-1">Availability:</span> In Stock</p>
                        <p className="text-gray-400 text-xs">
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;