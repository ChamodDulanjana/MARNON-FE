import {useEffect, useMemo, useState} from "react";
import Filter from "../components/filter/page.tsx";
import ProductGrid from "../components/productGrid/page.tsx";
import { FilterProductDTO } from "../models/filterProductDTO.ts";
import { useParams } from "react-router-dom";
import {useIsScreenWide} from "../hooks/useIsScreenWide.tsx";
import { FaSlidersH } from "react-icons/fa";
import {useDisclosure} from "@heroui/react";
import ResponsiveFilter from "../components/responsive-filter/page.tsx";



const ShopCategory = () => {
    const { category } = useParams<{ category: string }>();
    const isWide = useIsScreenWide('xl');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const header: string = useMemo(() => {
        switch (category) {
            case 'men':    return 'Men';
            case 'women':  return 'Women';
            case 'kids':    return 'Kid';
            default:       return '';
        }
    }, [category]);

    // State to hold the filters data
    const [filters, setFilters] = useState<FilterProductDTO>({
        sortBy: 'newest',
        size: null,
        color: null,
        categoryName: undefined
    })

    // Effect to set the filters clear when the header changes
    useEffect(() => {
        setFilters({
                sortBy: 'newest',
                size: null,
                color: null,
                categoryName: header
        } as FilterProductDTO
        )
    }, [header]);

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <span className='mt-14 text-3xl font-inter font-bold'>{header}</span>
            <h2 className='mt-2 text-gray-600'>Category / {header}</h2>

            {/*Filtering and product section*/}
            <div className='max-w-screen-2xl mt-10 px-5 flex justify-start items-start gap-10'>
                {/*Filter section*/}
                <Filter filters={filters} setFilters={setFilters}/>

                <div className='flex-1 flex flex-col justify-start items-start gap-5'>
                    {/*Responsive filter section*/}
                    {!isWide && (
                        <>
                            <div
                                className='flex justify-center items-center gap-1 cursor-pointer font-semibold'
                                onClick={() => onOpen()}
                            >
                                <FaSlidersH />
                                <span>Filter</span>
                            </div>
                            <ResponsiveFilter
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                filters={filters}
                                setFilters={setFilters}
                            />
                        </>
                    )}

                    {/*Products section*/}
                    <ProductGrid filters={filters}/>
                </div>
            </div>
        </div>
    );
};

export default ShopCategory;  