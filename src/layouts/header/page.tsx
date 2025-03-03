import { LuShoppingCart } from "react-icons/lu";
import {useState} from "react";

const Header = () => {

    const [cartCount, setCartCount] = useState<number>(0);

    return (
        <div className="bg-transparent rounded-lg w-full flex justify-center items-center top-10 fixed z-50">
            <div className="bg-white w-[80vw] rounded-full flex justify-around items-center p-2 gap-20">
                <div className="px-12 font-brith-stone font-extrabold text-3xl">
                    MARNON
                </div>
                <div>
                    <ul className="flex gap-10 text-[16px] font-medium font-poppins">
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">Men</li>
                        <li className="cursor-pointer">Women</li>
                        <li className="cursor-pointer">Kids</li>
                    </ul>
                </div>
                <div className="flex gap-6 items-center justify-center">
                    <div className="flex cursor-pointer">
                        <LuShoppingCart className="text-3xl"/>
                        <div className="w-[18px] h-[18px] rounded-full bg-red-600 relative -top-1 right-2 flex justify-center items-center">
                            <span className="text-white text-[12px] font-poppins">{cartCount}</span>
                        </div>
                    </div>
                    <div
                        className="bg-black border-2 border-black text-white text-sm font-medium cursor-pointer py-2 px-6 rounded-full transition-all hover:bg-white hover:text-black font-poppins"
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;