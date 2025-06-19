import {useQuery} from "@tanstack/react-query";
import {getFilteredProducts} from "@/services/productService.ts";
import {Link} from "react-router-dom";
import LoadingAnimation from "../loading-animation/page.tsx";
import NotFound from "../../pages/notFound.tsx";
import {FilterProductDTO} from "@/models/filterProductDTO.ts";

export type ProductProp = {
    id: number,
    name: string,
    description: string,
    buyingPrice: number,
    sellingPrice: number,
    color: string,
    image: string,
    isActive: boolean,
    createBy: string,
    modifyBy: string,
    createDate: string,
    modifyDate: string
}

type ProductGridProps = {
    filters: FilterProductDTO
}


const ProductGrid = ({filters}: ProductGridProps) => {
    const {
        isLoading,
        isError,
        data: products = [],      // default to an empty array
    } = useQuery({
        queryKey: ['products', filters],
        queryFn: () => getFilteredProducts(filters)
    });

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <>
            {products.length > 0 ? (
                <div className='grid grid-cols-4 max-2xl:grid-cols-3 max-md:grid-cols-2 w-full gap-5 mb-5'>
                    {products.map((product: ProductProp, index: number) => {
                        return(
                            <Link to={`/product/${product.id}`} key={index}>
                                <div
                                    key={index}
                                    className='w-full flex flex-col relative min-[2560px]:w-[380px]'
                                >
                                    <div
                                        className='w-full rounded-md bg-center bg-cover h-[230px] min-[340px]:h-[270px] min-[425px]:h-[350px] min-[560px]:h-[450px] 2xl:h-[430px] min-[1660px]:h-[480px] min-[2560px]:h-[600px]'
                                        style={{
                                            backgroundImage: `url(${product.image})`,
                                        }}
                                    ></div>
                                    <h3 className='font-medium font-poppins mt-3 text-[14px]'>
                                        {product.name}
                                    </h3>
                                    <h4 className='text-[14px] mt-2 text-gray-500 font-poppins font-medium'>
                                        LKR {product.sellingPrice}
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
            ) : (
                <div className='max-w-full h-full flex flex-col justify-center items-center gap-5 mt-6'>
                    <h2 className='text-xl font-normal text-gray-800'>No products found..</h2>
                </div>
            )}
        </>
    );
};

export default ProductGrid;