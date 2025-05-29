import {FilterProductDTO} from "../../models/filterProductDTO.ts";
import * as React from "react";
import FilterContent from "../filter-content/page.tsx";

type FilterProps = {
    filters: FilterProductDTO,
    setFilters: React.Dispatch<React.SetStateAction<FilterProductDTO>>
}

const Filter = ({filters, setFilters}: FilterProps) => {


    return (
        <div className='flex flex-col justify-center items-start max-w-xs min-w-[320px] border max-xl:hidden border-gray-300 rounded-md px-5 py-3'>
            <FilterContent
                filters={filters}
                setFilters={setFilters}
            />
        </div>
    );
};

export default Filter;