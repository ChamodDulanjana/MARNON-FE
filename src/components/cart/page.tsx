import {Button, Divider, Drawer, DrawerBody, DrawerContent} from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, addToCart } from "@/redux/cart/cartSlice";
import { FiTrash2 } from "react-icons/fi";
import {CartItem} from "@/redux/cart/types.ts";

interface CartProps {
    isOpen: boolean,
    onOpenChange: () => void
}

const Cart = ({isOpen, onOpenChange}: CartProps) => {
    const dispatch = useAppDispatch();
    const cartItems: CartItem[] = useAppSelector((state) => state.cart.items);


    const handleQtyChange = (productId: number, size: string, qty: number) => {
        if (qty > 0) {
            dispatch(addToCart({ productId, size, quantity: qty } as any));
        }
    };

    const handleRemove = (productId: number, size: string) => {
        dispatch(removeFromCart({ productId, size }));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return (
        <Drawer
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement={"right"}
            size={"lg"}
            className="rounded-none outline-0 transition-transform duration-700 ease-in-out font-poppins pb-5"
        >
            <DrawerContent>
                <DrawerBody>
                    <div className='w-full flex justify-center py-4'>
                        <p className='font-poppins text-lg mt-1 ml-4 font-semibold'>Shopping Cart</p>
                    </div>
                    <Divider />
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {cartItems.map((item, idx) => (
                                console.log(item),
                                <div key={idx} className="flex gap-4 items-start border-b pb-5  py-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-28 object-cover rounded"
                                    />

                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-normal text-sm line-clamp-2 max-w-80">{item.name}</h3>
                                            <button onClick={() => handleRemove(item.productId, item.size)}>
                                                <FiTrash2 className="text-red-500 hover:text-red-700 text-lg" />
                                            </button>
                                        </div>
                                        <div className='w-full flex gap-4'>
                                            <p className="text-[13px] text-gray-500">Size: {item.size}</p>
                                            <p className="text-[13px] text-gray-500">Color: {item.color}</p>
                                        </div>
                                        <div className='w-full flex justify-between items-center'>
                                            <div className="flex gap-2 mt-2 items-center">
                                                <button
                                                    onClick={() => handleQtyChange(item.productId, item.size, item.quantity - 1)}
                                                    className="border px-2 border-gray-300"
                                                >
                                                    -
                                                </button>
                                                <span className='mx-1'>{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQtyChange(item.productId, item.size, item.quantity + 1)}
                                                    className="border px-2 border-gray-300"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-700 font-medium">
                                                <span className='mr-1'>LKR</span>
                                                {item.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total:</span>
                                <span>
                                    <span className='mr-1'>LKR</span>
                                    {total}
                                </span>
                            </div>

                            <Button className="w-full bg-black text-white rounded mt-4">
                                Proceed to Checkout
                            </Button>
                        </div>
                    )}

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default Cart;