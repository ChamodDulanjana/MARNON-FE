import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../services/productService.ts";
import {colors} from "../assets/data/colors.ts";
import {useQuery} from "@tanstack/react-query";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";

type ProductType = {
    id: number,
    name: string,
    description: string,
    oldPrice: number,
    newPrice: number,
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

    const {
        isLoading,
        isError,
        data: product = {
            id: 0,
            name: "",
            description: "",
            oldPrice: 0,
            newPrice: 0,
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

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="flex flex-col lg:flex-row gap-14 p-6 lg:p-16 max-w-7xl mx-auto">
            {/* Left side: Images */}
            <div className="flex lg:flex-row gap-6">
                {product.image
                    .filter(img => img.type === 'MAIN')
                    .map((img, index) => (
                        <img
                            key={img.id}
                            src={img.image}
                            alt={`main-image-${index}`}
                            className="w-full max-w-md object-cover rounded-lg"
                        />
                    ))
                }

                <div className="flex flex-col gap-4 items-center justify-start">
                    {product.image
                        .map((img, index) => (
                            <img
                                key={img.id}
                                src={img.image}
                                alt={`sub-image-${index}`}
                                className="w-24 h-36 object-cover border rounded-md cursor-pointer"
                            />
                        ))
                    }
                </div>

            </div>

            {/* Right side: Details */}
            <div className="flex-1 space-y-4">
                <h1 className="text-2xl font-semibold">{product.name}</h1>
                <p className="text-xl font-medium text-gray-800">LKR {product.newPrice}</p>

                <p className="mt-4 text-sm text-gray-600">{product.description}</p>

                <div className="mt-4 space-y-3">
                    <div>
                         {colors.filter(item => item.hex === product.color)
                        .map(item => (
                            <span key={item.hex} className="font-semibold">COLOR:  <span className='text-gray-500 font-normal'>{item.name}</span></span>
                        ))}
                        <div className='w-7 h-7 mt-2 rounded-full flex items-center justify-center border border-gray-300'>
                            <div
                                className="w-5 h-5 rounded-full border border-gray-100"
                                style={{ backgroundColor: product.color }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <span className="font-semibold">SIZE:</span> {selectedSize}
                        <div className="flex gap-3 mt-2">
                            {product.size.map((size, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSize(size.size)}
                                    className={`px-4 py-2 border rounded ${
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

                    <div className="flex items-center gap-4 mt-4">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="px-3 py-1 border"
                        >−</button>
                        <span>{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            className="px-3 py-1 border"
                        >＋</button>
                    </div>

                    <button className="mt-4 w-full bg-black text-white py-3 font-semibold rounded">
                        Add to Cart
                    </button>

                    <div className="text-sm text-gray-600 space-y-1 mt-4">
                        <p className="text-green-600"><span className="font-semibold">Availability:</span> In Stock</p>
                        <p className="text-gray-400 text-xs">
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;