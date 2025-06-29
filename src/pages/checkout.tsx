import {CartItem} from "@/redux/cart/types.ts";
import {useAppSelector} from "@/redux/hooks.ts";
import {useEffect, useState} from "react";
import card from "@/assets/img/Visa-Mastercard.png";
import {Button, Form, Switch} from "@heroui/react";
import {Input} from "@heroui/input";
import {contactRegex, postalCodeRegex} from "@/util/regexPattens.ts";
import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import {getUserByEmail} from "@/services/userService.ts";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";
import {useAuthContext} from "@/context/authContext.tsx";
import {ResponseDTO} from "@/models/responseDTO.ts";
import {UserDTO} from "@/models/userDTO.ts";

const Checkout = () => {
    const cartItems: CartItem[] = useAppSelector((state) => state.cart.items);
    const total = Number(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    const [shippingFee] = useState<number>(350); // Example shipping fee, can be dynamic based on location or other factors
    const {userName} = useAuthContext(); // Get the user's email from the auth context
    const [selectedMethod, setSelectedMethod] = useState<null | 'cod' | 'card'>(null);


    const [firstName, setFirstName] = useState(''); // State for first name
    const [lastName, setLastName] = useState(''); // State for first name
    const [contact, setContact] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [townCity, setTownCity] = useState<string | undefined>('');
    const [provinceState, setProvinceState] = useState<string | undefined>('');
    const [postalCode, setPostalCode] = useState<string | undefined>('');



    const {
        isLoading,
        isError,
        data: response = { data: null } as ResponseDTO, // Default to an empty response if not loaded
    } = useQuery<ResponseDTO>({
        queryKey: ['user-checkout',],
        queryFn: () => getUserByEmail(userName),
    });


    // Fill stats with user data
    useEffect(() => {
        const user: UserDTO = response.data;

        setFirstName(user ? user.name.split(' ')[0] : ''); // Set first name from user data
        setLastName(user ? user.name.split(' ')[1] : ''); // Set first name from user data
        setContact(user ? user.contact : '');
        setStreetAddress(user ? user.streetAddress : '');
        setTownCity(user ? user.townOrCity : '');
        setProvinceState(user ? user.provinceOrState : '');
        setPostalCode(user ? user.postalCode : '');
    }, [response]);



    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();




        // Here you can handle the form submission, e.g., send data to the server
        console.log({
            firstName,
            lastName,
            contact,
            streetAddress,
            selectedMethod
        });

        // Reset the form or redirect user after successful submission
        e.currentTarget.reset();

    }

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className='w-full flex flex-col items-center'>
            <h2 className='mt-14 text-3xl font-inter font-bold'>Checkout</h2>
            <p className='mt-2 text-gray-600'>Cart / Checkout</p>

            <Form onSubmit={onSubmit} className='max-w-6xl w-full flex flex-col lg:flex-row justify-center lg:items-start items-center gap-10 mt-10 px-5 lg:px-12 font-poppins'>
                {/*Left side*/}
                <div className='flex-1 flex flex-col justify-start items-start gap-5'>
                    <div className='flex flex-col gap-10 w-full mb-4'>
                        {/*Name*/}
                        <div className='w-full'>
                            <h2 className='font-semibold text-lg mb-4'>Name</h2>
                            <p className='text-[12px] mb-1'>Please enter your first and last name.</p>
                            <div className='flex flex-col gap-4 w-full py-2'>
                                <Input
                                    name="firstName"
                                    isRequired
                                    label="First name"
                                    variant='bordered'
                                    type="text"
                                    value={firstName}
                                    onValueChange={setFirstName}
                                    validate={value => value.length < 3 ? "First name must be at least 3 characters long." : null}
                                />
                                <Input
                                    name="lastName"
                                    isRequired
                                    label="Last name"
                                    variant='bordered'
                                    type="text"
                                    value={lastName}
                                    onValueChange={setLastName}
                                    validate={value => value.length < 3 ? "Last name must be at least 3 characters long." : null}
                                />
                            </div>
                        </div>

                        {/*Contact*/}
                        <div className='w-full'>
                            <h2 className='font-semibold text-lg mb-4'>Contact</h2>
                            <p className='text-[12px] mb-2'>Please enter your contact number.</p>
                            <Input
                                name="contact"
                                isRequired
                                label="Contact"
                                variant='bordered'
                                type="text"
                                value={contact}
                                onValueChange={setContact}
                                validate={value => {
                                    if (!contactRegex.test(value)){
                                        return "Please enter a valid contact number (9-15 digits).";
                                    }
                                }}
                            />
                        </div>

                        {/*Address*/}
                        <div className='w-full'>
                            <h2 className='font-semibold text-lg mb-4'>Address</h2>
                            <p className='text-[12px] mb-2'>Please enter your address. This will be used for shipping and billing purposes.</p>
                            <div className='flex flex-col gap-4 w-full pt-2'>
                                <Input
                                    name="streetAddress"
                                    isRequired
                                    label="Street Address"
                                    variant='bordered'
                                    type="text"
                                    value={streetAddress}
                                    onValueChange={setStreetAddress}
                                    validate={value => value.length < 6 ? "Street address must be at least 3 characters long." : null}
                                />
                                <Input
                                    name="townCity"
                                    isRequired
                                    label="Town/City"
                                    variant='bordered'
                                    type="text"
                                    value={townCity}
                                    onValueChange={setTownCity}
                                    validate={value => value.length < 4 ? "Town/City must be at least 3 characters long." : null}
                                />
                                <Input
                                    name="provinceState"
                                    isRequired
                                    label="Province/State"
                                    variant='bordered'
                                    type="text"
                                    value={provinceState}
                                    onValueChange={setProvinceState}
                                    validate={value => value.length < 4 ? "Province/State must be at least 3 characters long." : null}
                                />
                                <Input
                                    name="postalCode"
                                    isRequired
                                    label="Postal Code"
                                    variant='bordered'
                                    type="text"
                                    value={postalCode}
                                    onValueChange={setPostalCode}
                                    validate={value => !postalCodeRegex.test(value) ? "Please enter a valid postal code." : null}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/*Right side*/}
                <div className='flex-1 flex flex-col justify-start items-start gap-5 bg-gray-100 p-4 rounded-md mb-10'>
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start border-b border-gray-300 pb-5 w-full">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-28 object-cover rounded"
                            />

                            <div className="flex-1 space-y-1">
                                <h3 className="font-normal text-sm line-clamp-2 max-w-80">{item.name}</h3>
                                <div className='w-full flex gap-4'>
                                    <p className="text-[13px] text-gray-500">Size: {item.size}</p>
                                    <p className="text-[13px] text-gray-500">Color: {item.color}</p>
                                </div>
                                <div className='w-full flex justify-between items-center'>
                                    <div className="flex gap-2 mt-2 items-center">
                                        <span className='px-2 py-px bg-gray-500 text-white rounded-sm'>x {item.quantity}</span>
                                    </div>
                                    <p className="text-[15px] text-gray-700 font-medium">
                                        <span className='mr-1'>LKR</span>
                                        {item.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/*Total price*/}
                    <div className="flex flex-col w-full mt-8 gap-6 text-[15px]">
                        {/*Subtotal*/}
                        <div className="flex justify-between items-center border-b pb-2 border-gray-300">
                            <span>Subtotal:</span>
                            <span>
                                <span className='mr-1'>LKR</span>
                                {Intl.NumberFormat(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }).format(total)}
                            </span>
                        </div>

                        {/*Shipping Fee*/}
                        <div className="flex flex-col w-full gap-1 border-b pb-2 border-gray-300">
                            <span>Shipping</span>
                            <div className="flex justify-between items-center">
                                <span className=''>Flat rate:</span>
                                <span>
                                <span className='mr-1'>LKR</span>
                                    {shippingFee}
                            </span>
                            </div>
                        </div>

                        {/*Total*/}
                        <div className="flex justify-between items-center border-b pb-2 border-gray-300">
                            <span>Total:</span>
                            <span>
                                <span className='font-semibold'>
                                    <span className='mr-1'>LKR</span>
                                    {Intl.NumberFormat(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }).format(total + shippingFee)}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/*Payment method*/}
                    <div className="w-full mt-6 text-[15px] flex gap-4 flex-col">
                        <div className='flex flex-col gap-1 mb-4'>
                            <span className='font-semibold'>Payment Method</span>
                            <span className='text-gray-500 text-sm'>Select your preferred payment method</span>
                        </div>
                        <div className='w-full px-4 py-3 border border-gray-300 bg-white flex items-center gap-3'>
                            <Switch
                                color='success'
                                isSelected={selectedMethod === 'cod'}
                                onValueChange={(selected) => {
                                    setSelectedMethod(selected ? 'cod' : null);
                                }}
                            />
                            Cash on Delivery
                        </div>
                        <div className='w-full px-4 py-3 border border-gray-300 bg-white flex gap-3'>
                            <Switch
                                color='success'
                                isSelected={selectedMethod === 'card'}
                                onValueChange={(selected) => {
                                    setSelectedMethod(selected ? 'card' : null);
                                }}
                            />
                            <div className='flex flex-col gap-2'>
                                <span>Visa / Mastercard</span>
                                <img src={card} alt="card-payment" className='w-16'/>
                            </div>
                        </div>
                    </div>

                    {/*Checkout button*/}
                    <Button
                        type='submit'
                        color={'primary'}
                        className='w-full mt-5'
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Checkout;