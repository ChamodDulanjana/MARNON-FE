import {Link} from "react-router-dom";
import {Drawer, DrawerBody, DrawerContent} from "@heroui/react";
import menus from "@/assets/data/menus.ts";

type ResponsiveNavProps = {
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void,
    onClose: () => void,
}

const ResponsiveNav = ({isOpen, onOpenChange, onClose}: ResponsiveNavProps) => {
    return (
        <Drawer
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement={"right"}
            size={"sm"}
            className="rounded-none outline-0 transition-transform duration-700 ease-in-out"
        >
            <DrawerContent>
                <DrawerBody>
                    <p className='font-poppins text-lg mt-1 ml-4'>Menu</p>
                    <ul className='mt-1 text-[15px] text-gray-600 font-semibold flex flex-col item-center justify-center font-poppins'>
                        {menus.map((menu) => (
                            <Link to={menu.url} key={menu.id}>
                                <li
                                    className="cursor-pointer w-full hover:translate-x-2 transition-all duration-300 ease-in-out border-t-1 py-4 text-sm"
                                    onClick={onClose}
                                >
                                    {menu.name}
                                </li>
                            </Link>
                        ))}
                    </ul>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default ResponsiveNav;