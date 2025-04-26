import {getProductsByCategory} from '../../services/productService.ts'
import {useMemo} from "react";
import { useQuery } from '@tanstack/react-query';

type Props = {
    category: string
}

type ProductProp = {
    id: number,
    name: string,
    description: string,
    oldPrice: number,
    newPrice: number,
    color: string,
    image: string,
    isActive: string,
    createBy: string,
    modifyBy: string,
    createDate: string,
    modifyDate: string
}

const ShopCategory = ({category} : Props) => {

    const header: string = useMemo(() => {
        switch (category) {
            case 'men':    return 'Men';
            case 'women':  return 'Women';
            case 'kid':    return 'Kid';
            default:       return '';
        }
    }, [category]);

    const {
        isLoading,
        isError,
        data: products = [],      // default to an empty array
    } = useQuery({
        queryKey: ['products', category],
        queryFn: () => getProductsByCategory(header)
    });

    if (isLoading) return <p>Loading…</p>;
    if (isError)   return <p>Error loading products.</p>;

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <span className='mt-40 text-3xl font-inter font-bold'>{header}</span>
            <h2 className='mt-2 text-gray-600'>Category / {header}</h2>

            {/*Filtering and product section*/}
            <div className='w-[92vw] mt-10 flex justify-center items-start px-5 gap-10'>
                {/*Filter section*/}
                <div className='flex justify-center items-center w-[25vw] h-72 border max-xl:hidden border-black rounded-md'>
                    {/*need to develop*/}
                </div>

                {/*Products section*/}
                <div className='grid grid-cols-4 max-2xl:grid-cols-3 max-md:grid-cols-2 w-full px-5 gap-5 mb-5'>
                    {products.map((product: ProductProp, index: number) => {
                        return(
                            <div key={index} className='max-w-[300px] flex flex-col relative'>
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
                                    <div className='bg-black w-full h-full rounded-full'></div>
                                </div>
                                <div className='bg-white w-10 h-9'></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShopCategory;