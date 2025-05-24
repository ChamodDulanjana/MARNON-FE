import { LuShoppingCart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import {Link} from "react-router-dom";
import {useDisclosure} from "@heroui/react";
import SignIn from "../../pages/signIn.tsx";
import {FaBars} from "react-icons/fa";
import ResponsiveNav from "../../components/responsive-nav/page.tsx";
import {useState} from "react";
import SignUp from "../../pages/signUp.tsx";

const Header = () => {
    const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
    const {isOpen: isLoginOpen, onOpen: loginOnOpen, onOpenChange: isLoginOpenChange, onClose: loginOnClose} = useDisclosure();
    const {isOpen: isSignupOpen, onOpen: signupOnOpen, onOpenChange: isSignupOpenChange} = useDisclosure();

    return (
        <div className={`w-full bg-black text-white flex items-center justify-around px-10 py-5 transition-all duration-300 ease-in-out fixed top-0 z-20  max-[850px]:justify-between`}>
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
                <span onClick={loginOnOpen} className='text-white text-xl cursor-pointer'><FiUser /></span>
            </div>

            {/* Hamburger menu icon for mobile view */}
            <div
                className='hidden max-[850px]:inline mr-10 cursor-pointer text-lg'
                onClick={() => setIsMenuClicked(!isMenuClicked)}
            >
                <FaBars />
            </div>

            {/*Responsive navbar for mobile view*/}
            <ResponsiveNav isMenuClicked={isMenuClicked} loginOnOpen={loginOnOpen}/>

            {/*Login model*/}
            <SignIn isOpen={isLoginOpen} onOpenChange={isLoginOpenChange} loginOnClose={loginOnClose} signupOnOpen={signupOnOpen}/>

            {/*SignUp model*/}
            <SignUp isOpen={isSignupOpen} onOpenChange={isSignupOpenChange}/>

        </div>
    );
};

export default Header;