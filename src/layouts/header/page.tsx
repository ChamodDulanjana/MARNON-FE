import { LuShoppingCart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import {Link} from "react-router-dom";
import {Avatar, useDisclosure} from "@heroui/react";
import SignIn from "../../pages/signIn.tsx";
import {FaBars} from "react-icons/fa";
import ResponsiveNav from "../../components/responsive-nav/page.tsx";
import SignUp from "../../pages/signUp.tsx";
import {useIsScreenWide} from "../../hooks/useIsScreenWide.tsx";
import {useEffect} from "react";
import {Tooltip} from "@heroui/tooltip";

const Header = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const {isOpen: isLoginOpen, onOpen: loginOnOpen, onOpenChange: isLoginOpenChange, onClose: loginOnClose} = useDisclosure();
    const {isOpen: isSignupOpen, onOpen: signupOnOpen, onOpenChange: isSignupOpenChange, onClose: signUpOnClose} = useDisclosure();
    const isWide = useIsScreenWide(850);
    const isUserLoggedIn = sessionStorage.getItem('userId') !== null;
    const userName = sessionStorage.getItem('userName') || '';

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
                <span className='text-white text-xl cursor-pointer'><LuShoppingCart /></span>
                { isUserLoggedIn ? (
                    <Tooltip content={userName} placement={'bottom'}>
                        <Avatar name={userName[0].toUpperCase()} size={"sm"} className='text-[16px] cursor-pointer'/>
                    </Tooltip>
                ) : (
                    <span onClick={loginOnOpen} className='text-white text-xl cursor-pointer'><FiUser /></span>
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
            <SignIn isOpen={isLoginOpen} onOpenChange={isLoginOpenChange} loginOnClose={loginOnClose} signupOnOpen={signupOnOpen}/>

            {/*SignUp model*/}
            <SignUp isOpen={isSignupOpen} onOpenChange={isSignupOpenChange} signUpOnClose={signUpOnClose} loginOnOpen={loginOnOpen}/>

        </div>
    );
};

export default Header;