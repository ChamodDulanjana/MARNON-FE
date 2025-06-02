import {Link} from "react-router-dom";
import {Drawer, DrawerBody, DrawerContent} from "@heroui/react";
import {LuShoppingCart} from "react-icons/lu";
import {FiUser} from "react-icons/fi";
import {Tooltip} from "@heroui/tooltip";

type ResponsiveNavProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    loginOnOpen?: () => void
}

const ResponsiveNav = ({isOpen, onOpenChange, onClose, loginOnOpen}: ResponsiveNavProps) => {

    const handelLogin = () => {
        if (loginOnOpen) loginOnOpen();
        onClose();
    }
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
            className="rounded-none outline-0"
        >
            <DrawerContent>
                <DrawerBody>
                    <ul className='space-y-3 mt-10 text-[15px] text-gray-600'>
                        <li
                            className="cursor-pointer w-full hover:translate-x-2 transition-all duration-300 ease-in-out"
                            onClick={onClose}
                        >
                            <Link to="/">Home</Link>
                        </li>
                        <li
                            className="cursor-pointer w-full hover:translate-x-2 transition-all duration-300 ease-in-out"
                            onClick={onClose}
                        >
                            <Link to="/men">Men</Link>
                        </li>
                        <li
                            className="cursor-pointer w-full hover:translate-x-2 transition-all duration-300 ease-in-out"
                            onClick={onClose}
                        >
                            <Link to="/women">Women</Link>
                        </li>
                        <li
                            className="cursor-pointer w-full hover:translate-x-2 transition-all duration-300 ease-in-out"
                            onClick={onClose}
                        >
                            <Link to="/kids">Kids</Link>
                        </li>
                    </ul>

                    {/*Cart & User*/}
                    <div className="flex flex-col mt-8 gap-5 text-gray-600">
                        <Link to='/checkout/cart'>
                            <Tooltip content="Cart" placement="right">
                                <LuShoppingCart
                                    className="text-xl cursor-pointer outline-0"
                                    onClick={onClose}
                                />
                            </Tooltip>
                        </Link>

                        <Tooltip content="Login" placement="right">
                            <FiUser
                                className="text-xl cursor-pointer outline-0"
                                onClick={handelLogin}
                            />
                        </Tooltip>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default ResponsiveNav;