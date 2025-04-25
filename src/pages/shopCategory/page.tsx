
type Props = {
    category: string;
}

const ShopCategory = ({category} : Props) => {
    return (
        <div className='w-full h-full bg-indigo-200'>
            {category}
        </div>
    );
};

export default ShopCategory;