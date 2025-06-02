import { LuShoppingCart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import {Link} from "react-router-dom";
import {Avatar, useDisclosure} from "@heroui/react";
import SignIn from "../../components/sign-in/page.tsx";
import {FaBars} from "react-icons/fa";
import ResponsiveNav from "../../components/responsive-nav/page.tsx";
import SignUp from "../../components/sign-up/page.tsx";
import {useIsScreenWide} from "../../hooks/useIsScreenWide.tsx";
import {useEffect} from "react";
import {Tooltip} from "@heroui/tooltip";
import UserProfile from "../../components/user-profile/page.tsx";
import {useAuthContext} from "../../context/authContext.tsx";

const Header = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const {isOpen: isLoginOpen, onOpen: loginOnOpen, onOpenChange: isLoginOpenChange, onClose: loginOnClose} = useDisclosure();
    const {isOpen: isSignupOpen, onOpen: signupOnOpen, onOpenChange: isSignupOpenChange, onClose: signUpOnClose} = useDisclosure();
    const {isOpen: isUserProfileOpen, onOpen: UserProfileOnOpen, onOpenChange: UserProfileOpenChange} = useDisclosure();
    const isWide = useIsScreenWide(850);
    const { isLoggedIn, userName } = useAuthContext();

    useEffect(() => {
        if (isWide){
            onClose(); // Close the responsive nav when the screen is wide
        }
    }, [isWide, onClose]);

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
                <Tooltip content="Cart" placement={'bottom'}>
                    <span className='text-white text-xl cursor-pointer'><LuShoppingCart /></span>
                </Tooltip>
                { isLoggedIn ? (
                    <Tooltip content={userName} placement={'bottom'}>
                        <Avatar
                            name={userName ? userName[0].toUpperCase() : ''}
                            size={"sm"}
                            className='text-[15px] cursor-pointer'
                            onClick={() => UserProfileOnOpen()}
                        />
                    </Tooltip>
                ) : (
                    <Tooltip content="Login" placement={'bottom'}>
                        <span onClick={loginOnOpen} className='text-white text-xl cursor-pointer'><FiUser /></span>
                    </Tooltip>
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
            <ResponsiveNav isOpen={isOpen} onOpenChange={onOpenChange} loginOnOpen={loginOnOpen}/>

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