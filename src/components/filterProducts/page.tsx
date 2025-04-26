import {getAllActiveSizes} from '../../services/sizeService.ts'
import { FaAngleDown } from "react-icons/fa6";
import {useEffect, useState} from "react";

type SizeProps = {
    id: number,
    size: string,
    isActive: boolean,
    createBy: string,
    modifyBy: string,
    createDate: string,
    modifyDate: string
}

const FilterProducts = () => {
    const [sizes, setSizes] = useState<SizeProps[]>([]);
    const [isSizeDropdownClicked, setIsSizeDropdownClicked] = useState<boolean>(false);
    const [isColorDropdownClicked, setIsColorDropdownClicked] = useState<boolean>(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    useEffect(() => {
        loadSizes();
    }, []);

    const loadSizes = async () => {
        try {
            const data = await getAllActiveSizes();
            setSizes(data);
        } catch (err) {
            console.error('Failed to load sizes', err);
        }
    };

    return (
        <div className='flex flex-col justify-center items-start w-[25vw] border max-xl:hidden border-gray-300 rounded-md px-5 py-3'>
            {/*Sort By*/}
            <div className='w-full h-full flex justify-start items-start flex-col'>
                <p className='font-poppins'>Sort By</p>
                <div className='w-[20vw] h-[1px] bg-gray-300 mt-2 mb-5'></div>

                {/* Radio buttons list */}
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-2 font-poppins text-sm">
                        <input type="radio" name="sort" value="newest" className="accent-indigo-500" />
                        Newest
                    </label>
                    <label className="flex items-center gap-2 font-poppins text-sm">
                        <input type="radio" name="sort" value="popularity" className="accent-indigo-500" />
                        Popularity
                    </label>
                    <label className="flex items-center gap-2 font-poppins text-sm">
                        <input type="radio" name="sort" value="priceHighToLow" className="accent-indigo-500" />
                        Price High To Low
                    </label>
                    <label className="flex items-center gap-2 font-poppins text-sm">
                        <input type="radio" name="sort" value="priceLowToHigh" className="accent-indigo-500" />
                        Price Low To High
                    </label>
                </div>
            </div>

            {/*Size*/}
            <div className='w-full h-full flex justify-start items-start flex-col mt-5'>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-poppins'>Size</p>
                    <span
                        className={`cursor-pointer transition-transform duration-300 ${isSizeDropdownClicked ? 'rotate-180' : 'rotate-0'}`}
                        onClick={() => setIsSizeDropdownClicked(!isSizeDropdownClicked)}
                    >
                        <FaAngleDown />
                    </span>
                </div>
                <div className='w-[20vw] h-[1px] bg-gray-300 mt-2 mb-5'></div>
                <div
                    className={`w-full flex flex-wrap gap-4 overflow-hidden transition-all duration-300
                    ${isSizeDropdownClicked ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
                    `}
                >
                    {sizes.map((size: SizeProps, index: number) => (
                        <div
                            key={index}
                            className={`border border-gray-400 w-9 h-9 rounded-md flex items-center justify-center cursor-pointer
                            ${selectedSize === size.size ? `bg-black text-white border-none` : `bg-white text-black`}
                            `}
                            onClick={() => setSelectedSize(selectedSize === size.size ? null : size.size)}
                        >
                            {size.size}
                        </div>
                    ))}
                </div>
            </div>

            {/*Colour*/}
            <div className='w-full h-full flex justify-start items-start flex-col mt-5'>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-poppins'>Color</p>
                    <span
                        className={`cursor-pointer transition-transform duration-300 ${isSizeDropdownClicked ? 'rotate-180' : 'rotate-0'}`}
                        onClick={() => setIsColorDropdownClicked(!isColorDropdownClicked)}
                    >
                        <FaAngleDown />
                    </span>
                </div>
                <div className='w-[20vw] h-[1px] bg-gray-300 mt-2 mb-5'></div>

            </div>

        </div>
    );
};

export default FilterProducts;