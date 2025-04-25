
type Props = {
    category: string;
}

const ShopCategory = ({category} : Props) => {

    const categoryHeader = (): string => {
        if (category === 'men'){
            return 'Men';
        } else if (category === 'women'){
            return 'Women'
        } else {
            return 'Kid'
        }
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <span className='mt-40 text-3xl font-inter font-bold'>{categoryHeader()}</span>
            <h2 className='mt-2 text-gray-600'>Category / {categoryHeader()}</h2>

            {/*Filtering and product section*/}
            <div className='w-[92vw] mt-10 flex justify-center items-start px-5 gap-10'>
                {/*Filter section*/}
                <div className='flex justify-center items-center w-[25vw] h-72 border max-xl:hidden border-black rounded-md'>
                    {/*need to develop*/}
                </div>

                {/*Products section*/}
                <div className='grid grid-cols-4 max-2xl:grid-cols-3 max-md:grid-cols-2 w-full px-5 gap-5'>

                    {[...Array(5)].map((_, index) => (
                        <div key={index} className='max-w-[300px] flex flex-col'>
                            <div className='bg-indigo-300 w-full h-[400px] rounded-md max-lg:h-[350px] max-sm:h-[300px] max-[540px]:h-[250px] max-[470px]:h-[200px]'></div>
                            <h3 className='font-medium font-poppins mt-3 text-[15px]'>
                                GRAFFITY GAL Girls Crew Neck Teen T-Shirt White
                            </h3>
                            <h4 className='text-[14px] mt-2 text-gray-500 font-poppins font-medium'>
                                LKR 1450.00
                            </h4>
                            <div className='w-6 h-6 border rounded-full border-gray-300 mt-2 p-1'>
                                <div className='bg-black w-full h-full rounded-full'></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopCategory;