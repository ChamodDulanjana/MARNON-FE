import {FaFacebookSquare} from "react-icons/fa";
import {LuInstagram} from "react-icons/lu";
import {IoLogoYoutube} from "react-icons/io";
import {Link} from "react-router-dom";
import {CiLocationOn, CiPhone} from "react-icons/ci";

const Footer = () => {

    const scrollToTop = () => {
        setTimeout(
            () => window.scrollTo({ top: 0, behavior: 'auto' }),
            10
        )
    }

    return (
        <div className='w-full bg-black flex flex-col items-center justify-start px-8 pt-10 pb-5 z-20 relative bottom-0'>
            <div className='flex items-start justify-around w-full max-[860px]:flex-col max-[860px]:items-center max-[860px]:space-y-20'>
                {/*Description*/}
                <div className='gap-5 flex flex-col items-start max-[860px]:items-center max-[860px]:justify-center'>
                    <h1 className='font-brith-stone text-white text-5xl font-semibold text-left'>MARNON</h1>
                    <p className='text-white w-72 max-[860px]:w-90 max-[860px]:text-center max-[430px]:w-60 -mt-1'>
                        Discover everyday fashion with a modern edge where comfort meets confidence in every stitch.
                    </p>
                    <div className='flex items-center justify-start w-full gap-5 max-[860px]:justify-center'>
                        <FaFacebookSquare
                            className='text-white text-2xl cursor-pointer'
                            onClick={() => window.open('', '_blank')}
                        />
                        <LuInstagram
                            onClick={() => window.open('', '_blank')}
                            className='text-white text-2xl cursor-pointer'
                        />
                        <IoLogoYoutube
                            onClick={() => window.open('', '_blank')}
                            className='text-white text-2xl cursor-pointer'
                        />
                    </div>
                </div>

                {/*Important Links*/}
                <div className='space-y-5 mt-2'>
                    <h2 className='text-white text-2xl font-semibold tracking-normal'>Important Links</h2>
                    <ul className='text-white space-y-2 max-[860px]:flex max-[860px]:flex-col max-[860px]:items-center max-[860px]:space-y-5'>
                        <li className='cursor-pointer hover:underline' onClick={scrollToTop}>
                            <Link to='/information/faq'>FAQs</Link>
                        </li>
                        <li className='cursor-pointer hover:underline' onClick={scrollToTop}>
                            <Link to='/information/privacy-and-policy'>Privacy Policy</Link>
                        </li>
                        <li className='cursor-pointer hover:underline' onClick={scrollToTop}>
                            <Link to='/information/terms-and-conditions'>Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>

                {/*Featured Links*/}
                <div className='space-y-5 mt-2'>
                    <h2 className='text-white text-2xl font-semibold tracking-normal'>Featured Links</h2>
                    <ul className='text-white space-y-2 max-[860px]:flex max-[860px]:flex-col max-[860px]:items-center max-[860px]:space-y-5'>
                        <li className='cursor-pointer hover:underline' onClick={scrollToTop}>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='cursor-pointer hover:underline' onClick={scrollToTop}>
                            <Link to='/men'>Men</Link>
                        </li>
                        <li className='cursor-pointer hover:underline' onClick={scrollToTop}>
                            <Link to='/women'>Women</Link>
                        </li>
                        <li className='cursor-pointer hover:underline' onClick={scrollToTop}>
                            <Link to='/kids'>Kids</Link>
                        </li>
                    </ul>
                </div>

                {/*Contact us*/}
                <div className='w-56 flex flex-col mt-2 space-y-5 max-[860px]:items-center max-[860px]:w-full'>
                    <h2 className='text-white text-2xl font-semibold tracking-normal'>Contact us</h2>
                    <div className='space-y-5 max-[860px]:flex max-[860px]:flex-col max-[860px]:items-center'>
                        <div className='flex justify-start items-start gap-4'>
                            <span className='text-white text-3xl'><CiLocationOn /></span>
                            <p className='text-white'>No 92, Santhanampitiya Rd, Gangodawila, Nugegoda.</p>
                        </div>
                        <div className='flex justify-start items-start gap-4'>
                            <span className='text-white text-3xl'><CiPhone /></span>
                            <p className='text-white'>+94 77 381 0577</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col items-center mt-16'>
                <div className='w-[90%] h-[1px] bg-white rounded-full mb-3'></div>
                <div className='text-white text-center text-[12px]'>
                    <span className='mr-1'>Copyright © 2025. All Right Reserved</span>
                    <span> | </span>
                    <span className='ml-1'>Website by
                        <a
                            className='ml-1 underline'
                            href='https://chamoddulanjana.github.io/myPortfolio/'
                            target='_blank'
                        >Chamod Dulanjana</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;