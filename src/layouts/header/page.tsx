import { LuShoppingCart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import {Link} from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure} from "@heroui/react";
import SignIn from "../../components/sign-in/page.tsx";
import {FaBars} from "react-icons/fa";
import ResponsiveNav from "../../components/responsive-nav/page.tsx";
import SignUp from "../../components/sign-up/page.tsx";
import {useIsScreenWide} from "../../hooks/useIsScreenWide.tsx";
import {useEffect} from "react";
import {Tooltip} from "@heroui/tooltip";
import UserProfile from "../../components/user-profile/page.tsx";
import {useAuthContext} from "../../context/authContext.tsx";
import {IoPower, IoSettingsOutline} from "react-icons/io5";
import {MdAdminPanelSettings} from "react-icons/md";
import {clearStorage} from "../../services/storageService.ts";
import { Key } from "@react-types/shared";

const Header = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const {
        isOpen: isLoginOpen,
        onOpen: loginOnOpen,
        onOpenChange: isLoginOpenChange,
        onClose: loginOnClose
    } = useDisclosure();
    const {
        isOpen: isSignupOpen,
        onOpen: signupOnOpen,
        onOpenChange: isSignupOpenChange,
        onClose: signUpOnClose
    } = useDisclosure();
    const {isOpen: isUserProfileOpen, onOpen: UserProfileOnOpen, onOpenChange: UserProfileOpenChange} = useDisclosure();
    const isWide = useIsScreenWide(850);
    const {isLoggedIn, role} = useAuthContext();

    useEffect(() => {
        if (isWide) {
            onClose(); // Close the responsive nav when the screen is wide
        }
    }, [isWide, onClose]);

    // Handle dropdown action
    const handleDropdownAction = (key: Key) => {
        if (key === 'logout') {
            clearStorage();
            window.location.href = '/'; // Redirect to home page after logout
        } else if (key === 'account') {
            UserProfileOnOpen();
        } else if (key === 'admin') {
            window.location.href = '/admin/dashboard'; // Redirect to admin dashboard
        }
    };

    return (
        <div className={`w-full bg-black text-white flex items-center justify-around px-10 max-sm:px-5 py-5 transition-all duration-300 ease-in-out fixed top-0 z-20  max-[850px]:justify-between`}>
            {/*Logo*/}
            <div className="font-brith-stone font-extrabold text-3xl">MARNON</div>

            {/*Navbar*/}
            <div className='max-[850px]:hidden'>
                <ul className='flex gap-10 text-[16px] font-normal font-poppins'>
                    <li className="cursor-pointer">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/men">Men</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/women">Women</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/kids">Kids</Link>
                    </li>
                </ul>
            </div>

            {/*Cart & User*/}
            <div className="flex gap-6 items-center justify-center max-[850px]:hidden">
                {/*Cart Icon*/}
                <Tooltip content="Cart" placement={'bottom'}>
                    <Link to='/checkout/cart'>
                        <span className='text-white text-xl cursor-pointer'><LuShoppingCart /></span>
                    </Link>
                </Tooltip>

                {/*User Icon*/}
                { !isLoggedIn && (
                    <Tooltip content="Login" placement={'bottom'}>
                        <span onClick={loginOnOpen} className='text-white text-xl cursor-pointer'><FiUser /></span>
                    </Tooltip>
                )}

                {/*Setting / Dropdown*/}
                { isLoggedIn && (
                    <Dropdown className='font-poppins mt-2'>
                        <DropdownTrigger>
                            <div>
                                <Tooltip content="Setting" placement={'bottom'}>
                                    <IoSettingsOutline className='text-xl outline-0 cursor-pointer'/>
                                </Tooltip>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Static Actions"
                            onAction={(key) => handleDropdownAction(key)}
                        >
                            {/*User Profile*/}
                            <DropdownItem
                                key="account"
                                className='flex flex-row gap-2'
                                startContent={<FiUser className='text-sm -mt-px'/>}
                            >
                                Account
                            </DropdownItem>

                            {/*Admin Dashboard*/}
                            { isLoggedIn && role === 'ADMIN' ? (
                                <DropdownItem
                                    key="admin"
                                    startContent={<MdAdminPanelSettings className='text-sm -mt-px'/>}
                                >
                                    Admin Dashboard
                                </DropdownItem>

                            ) : null }

                            {/*Logout*/}
                            <DropdownItem
                                key="logout"
                                className="text-danger"
                                color="danger"
                                startContent={<IoPower className='text-sm -mt-px'/>}
                            >
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </div>

            {/* Hamburger menu icon for mobile view */}
            <Tooltip content="Menu" placement="bottom">
                <div
                    className='hidden max-[850px]:inline cursor-pointer text-lg'
                    onClick={() => onOpen()}
                >
                    <FaBars />
                </div>
            </Tooltip>

            {/*Responsive navbar for mobile view*/}
            <ResponsiveNav isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} loginOnOpen={loginOnOpen} UserProfileOnOpen={UserProfileOnOpen}/>

            {/*Login model*/}
            {isLoginOpen && (
                <SignIn isOpen={isLoginOpen} onOpenChange={isLoginOpenChange} loginOnClose={loginOnClose} signupOnOpen={signupOnOpen}/>
            )}

            {/*SignUp model*/}
            {isSignupOpen && (
                <SignUp isOpen={isSignupOpen} onOpenChange={isSignupOpenChange} signUpOnClose={signUpOnClose} loginOnOpen={loginOnOpen}/>
            )}

            {/*User Profile model*/}
            {isUserProfileOpen && (
                <UserProfile isOpen={isUserProfileOpen} onOpenChange={UserProfileOpenChange}/>
            )}
        </div>
    );
};

export default Header;