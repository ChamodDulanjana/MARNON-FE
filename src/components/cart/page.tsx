import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent, Modal, ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    useDisclosure
} from "@heroui/react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {removeFromCart, updateQuantity} from "@/redux/cart/cartSlice";
import {FiTrash2} from "react-icons/fi";
import {CartItem} from "@/redux/cart/types.ts";
import {useShopContext} from "@/context/shopContext.tsx";
import {useAuthContext} from "@/context/authContext.tsx";


interface CartProps {
    loginOnOpen: () => void
}

const Cart = ({loginOnOpen}: CartProps) => {
    const dispatch = useAppDispatch();
    const cartItems: CartItem[] = useAppSelector((state) => state.cart.items);
    const {cartIsOpen, cartOnOpenChange} = useShopContext();
    const {isLoggedIn} = useAuthContext();
    const {isOpen, onOpen, onOpenChange} = useDisclosure(); // for alert modal


    const handleQtyChange = (productId: number, size: string, qty: number) => {
        if (qty > 0) {
            dispatch(updateQuantity({productId, size, quantity: qty}));
        }
    };

    const handleRemove = (productId: number, size: string) => {
        dispatch(removeFromCart({productId, size}));
    };

    const total = Number(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));

    const handleCheckoutBtn = () => {
        if (!isLoggedIn) {
            onOpen(); // Open alert modal if user is not logged in
            return;
        }
        window.location.href = '/cart/checkout'; // Redirect to checkout page
    }

    const handleLoginBtn = () => {
        onOpenChange(); // Close alert modal
        loginOnOpen(); // Open login modal
    }

    return (
        <>
            {/*Cart Drawer*/}
            <Drawer
                isOpen={cartIsOpen}
                onOpenChange={cartOnOpenChange}
                placement={"right"}
                size={"lg"}
                className="rounded-none outline-0 transition-transform duration-700 ease-in-out font-poppins pb-5 overflow-x-hidden"
            >
                <DrawerContent>
                    <DrawerBody>
                        <div className='w-full flex justify-around py-2'>
                            <div
                                className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700'>{cartItems.length}</div>
                            <p className='font-poppins text-lg mt-1 font-semibold'>Shopping Cart</p>
                            <div className='w-1 h-1'></div>
                        </div>
                        <Divider/>
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500">Your cart is empty.</p>
                        ) : (
                            <div className="flex flex-col gap-6 pb-28">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start border-b pb-5  py-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-28 object-cover rounded"
                                        />

                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between gap-4">
                                                <h3 className="font-normal text-sm line-clamp-2 max-w-80">{item.name}</h3>
                                                <button onClick={() => handleRemove(item.productId, item.size)}>
                                                    <FiTrash2 className="text-red-500 hover:text-red-700 text-lg"/>
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

                                <div
                                    className='w-full flex flex-col gap-4 absolute bottom-0 overflow-hidden pr-12 py-4 bg-white'>
                                    <div className="flex justify-between items-center text-lg font-semibold">
                                        <span>Subtotal:</span>
                                        <span>
                                        <span className='mr-1'>LKR</span>
                                            {Intl.NumberFormat(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(total)}
                                    </span>
                                    </div>

                                    <Button className="w-full bg-black text-white rounded" onPress={handleCheckoutBtn}>
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>
                        )}

                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/*Alert Modal*/}
            {isOpen && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"md"}
                       className='m-4 my-auto overflow-hidden font-poppins'>
                    <ModalContent>
                        <ModalHeader className="-mb-2">
                            <h2 className=''>Proceed to checkout</h2>
                        </ModalHeader>
                        <ModalBody className='flex flex-col items-center text-sm'>
                            Please login to your account to proceed with the checkout.
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="solid"
                                color="primary"
                                className=''
                                onPress={handleLoginBtn}
                            >
                                Login
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

export default Cart;