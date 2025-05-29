import {Drawer, DrawerBody, DrawerContent, DrawerHeader} from "@heroui/react";
import {FaSlidersH} from "react-icons/fa";
import FilterContent from "../filter-content/page.tsx";
import {FilterProductDTO} from "../../models/filterProductDTO.ts";
import * as React from "react";

type ResponsiveFilterProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    filters: FilterProductDTO;
    setFilters: React.Dispatch<React.SetStateAction<FilterProductDTO>>;
}

const ResponsiveFilter = ({isOpen, onOpenChange, filters, setFilters}: ResponsiveFilterProps) => {
    return (
        <Drawer
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement={"left"}
            size={"sm"}
            motionProps={{
                variants: {
                    enter: { opacity: 1, x: 0 , transition: { duration: 0.3 } },
                    exit: { opacity: 0, x: '-100%', transition: { duration: 0.5 } }
                }
            }}
            className="rounded-none"
        >
            <DrawerContent>
                <DrawerHeader className='flex justify-start items-center gap-2 cursor-pointer font-semibold'>
                    <FaSlidersH />
                    <span>Filter</span>
                </DrawerHeader>
                <DrawerBody>
                    <FilterContent
                        key={filters.sortBy}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default ResponsiveFilter;