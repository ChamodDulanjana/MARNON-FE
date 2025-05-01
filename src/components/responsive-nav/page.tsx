import {Link} from "react-router-dom";

type ResponsiveNavProps = {
    isMenuClicked: boolean,
    loginOnOpen?: () => void
}

const ResponsiveNav = ({isMenuClicked, loginOnOpen}: ResponsiveNavProps) => {
    return (
        <div className={`
            w-full bg-black absolute top-[68px] left-0 z-10 overflow-hidden transition-all duration-300 ease-in-out min-[850px]:hidden
            transform origin-top
            ${isMenuClicked ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
        `}>

            <ul className='space-y-3 my-5'>
                <li className="cursor-pointer pl-10 w-full hover:translate-x-2 transition-all duration-300 ease-in-out">
                    <Link to="/">Home</Link>
                </li>
                <li className="cursor-pointer pl-10 w-full hover:translate-x-2 transition-all duration-300 ease-in-out">
                    <Link to="/men">Men</Link>
                </li>
                <li className="cursor-pointer pl-10 w-full hover:translate-x-2 transition-all duration-300 ease-in-out">
                    <Link to="/women">Women</Link>
                </li>
                <li className="cursor-pointer pl-10 w-full hover:translate-x-2 transition-all duration-300 ease-in-out">
                    <Link to="/kids">Kids</Link>
                </li>
            </ul>

            <ul className='space-y-3 my-5 mt-5'>
                <li className="cursor-pointer pl-10 w-full hover:translate-x-2 transition-all duration-300 ease-in-out font-semibold">
                    Cart
                </li>
                <li
                    className="cursor-pointer pl-10 w-full hover:translate-x-2 transition-all duration-300 ease-in-out font-semibold"
                    onClick={loginOnOpen}
                >
                    Login
                </li>
            </ul>
        </div>
    );
};

export default ResponsiveNav;