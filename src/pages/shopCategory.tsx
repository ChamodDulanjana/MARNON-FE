import {useMemo} from "react";
import FilterProducts from "../components/filterProducts/page.tsx";
import ProductGrid from "../components/productGrid/page.tsx";

type Props = {
    category: string
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


    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <span className='mt-14 text-3xl font-inter font-bold'>{header}</span>
            <h2 className='mt-2 text-gray-600'>Category / {header}</h2>

            {/*Filtering and product section*/}
            <div className='w-[92vw] mt-10 flex justify-center items-start px-5 gap-10'>
                {/*Filter section*/}
                <FilterProducts/>

                {/*Products section*/}
                <ProductGrid category={category} header={header}/>
            </div>
        </div>
    );
};

export default ShopCategory;  