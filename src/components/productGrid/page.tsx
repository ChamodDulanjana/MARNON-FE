import {useQuery} from "@tanstack/react-query";
import {getProductsByCategory} from "../../services/productService.ts";
import {Link} from "react-router-dom";
import LoadingAnimation from "../loading-animation/page.tsx";

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

type ProductGridProps = {
    category: string,
    header: string
}


const ProductGrid = ({category, header}: ProductGridProps) => {
    const {
        isLoading,
        isError,
        data: products = [],      // default to an empty array
    } = useQuery({
        queryKey: ['products', category],
        queryFn: () => getProductsByCategory(header)
    });

    console.log('Products:', products); // Debugging line to check fetched products

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <p>Error loading products.</p>;

    return (
        <div className='grid grid-cols-4 max-2xl:grid-cols-3 max-md:grid-cols-2 w-full px-5 gap-5 mb-5'>
            {products.map((product: ProductProp, index: number) => {
                return(
                    <Link to={`/product/${product.id}`} key={index} onClick={() =>{
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'auto'  // Optional: 'auto' or 'smooth'
                        });
                    }}>
                        <div
                            key={index}
                            className='max-w-[300px] flex flex-col relative'
                        >
                            <div
                                className='w-full h-[400px] rounded-md max-lg:h-[350px] max-sm:h-[300px] max-[540px]:h-[250px] max-[470px]:h-[200px] bg-center bg-cover'
                                style={{
                                    backgroundImage: `url(${product.image})`,
                                }}
                            ></div>
                            <h3 className='font-medium font-poppins mt-3 text-[15px]'>
                                {product.name}
                            </h3>
                            <h4 className='text-[14px] mt-2 text-gray-500 font-poppins font-medium'>
                                LKR {product.newPrice}
                            </h4>
                            <div className='w-6 h-6 border rounded-full border-gray-300 mt-1 p-1 absolute bottom-0'>
                                <div
                                    className="w-full h-full rounded-full border border-gray-300"
                                    style={{ backgroundColor: product.color }}
                                ></div>
                            </div>
                            <div className='bg-white w-10 h-9'></div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
};

export default ProductGrid;