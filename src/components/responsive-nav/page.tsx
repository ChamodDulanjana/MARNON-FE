import {Link} from "react-router-dom";
import {Drawer, DrawerBody, DrawerContent} from "@heroui/react";
import {LuShoppingCart} from "react-icons/lu";
import {FiUser} from "react-icons/fi";
import {IoPower} from "react-icons/io5";
import {useAuthContext} from "../../context/authContext.tsx";
import { MdAdminPanelSettings } from "react-icons/md";
import {clearStorage} from "../../services/storageService.ts";

type ResponsiveNavProps = {
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void,
    onClose: () => void,
    loginOnOpen: () => void,
    UserProfileOnOpen: () => void
}

const ResponsiveNav = ({isOpen, onOpenChange, onClose, loginOnOpen, UserProfileOnOpen}: ResponsiveNavProps) => {
    const {isLoggedIn, role} = useAuthContext();

    const handelLogin = () => {
        if (loginOnOpen) loginOnOpen();
        onClose();
    }

    const handelLogout = () => {
        clearStorage();
        onClose();
        window.location.href = '/'; // Redirect to home page after logout
        //window.location.reload(); // Reload the page to reflect the logout
    }

    const handelUserProfile = () => {
        if (UserProfileOnOpen) UserProfileOnOpen();
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
                    enter: {opacity: 1, x: 0, transition: {duration: 0.3}},
                    exit: {opacity: 0, x: '-100%', transition: {duration: 0.5}}
                }
            }}
            className="rounded-none outline-0"
        >
            <DrawerContent>
                <DrawerBody>
                    <ul className='space-y-3 mt-10 text-[15px] text-gray-600 font-semibold'>
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
                    <div className="flex flex-col gap-5 text-gray-600">
                        <ul className='space-y-3 mt-10 text-[15px] text-gray-600 font-semibold'>
                            {/*Cart*/}
                            <li
                                className="cursor-pointer w-full"
                                onClick={onClose}
                            >
                                <Link to='/checkout/cart'>
                                    <span className='flex gap-2'>
                                        <LuShoppingCart className='text-lg mt-[2px]'/>
                                        Cart
                                    </span>
                                </Link>
                            </li>
                            {isLoggedIn ? (
                                /*User Profile*/
                                <li
                                    className="cursor-pointer w-full"
                                    onClick={onClose}
                                >
                                    <span
                                        className='flex gap-2'
                                        onClick={handelUserProfile}
                                    >
                                        <FiUser className='text-lg mt-[2px]'/>
                                        Account
                                    </span>
                                </li>
                            ) : (

                                /*Login Btn*/
                                <li
                                    className="cursor-pointer w-full"
                                    onClick={handelLogin}
                                >
                                    <span className='flex gap-2'>
                                        <FiUser className='text-lg mt-[2px]'/>
                                        Login
                                    </span>
                                </li>
                            )}

                            {/*Admin Dashboard*/}
                            {isLoggedIn && role === 'ADMIN' && (
                                <li
                                    className="cursor-pointer w-full"
                                    onClick={onClose}
                                >
                                    <Link to="/admin-panel">
                                        <span className='flex gap-2'>
                                            <MdAdminPanelSettings className='text-lg mt-[2px]'/>
                                            Admin Dashboard
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/*Logout Btn*/}
                            {isLoggedIn && (
                                <li
                                    className="cursor-pointer w-full text-red-500"
                                    onClick={onClose}
                                >
                                <span
                                    className='flex gap-2 mt-5'
                                    onClick={handelLogout}
                                >
                                    <IoPower className='text-lg mt-[2px]'/>
                                    Logout
                                </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default ResponsiveNav;