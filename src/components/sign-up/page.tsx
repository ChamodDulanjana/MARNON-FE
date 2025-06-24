import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button, addToast, Form,
} from "@heroui/react";
import {useState} from "react";
import * as React from "react";
import {passwordRegex, contactRegex} from "@/util/regexPattens.ts";
import {Input} from "@heroui/input";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import {SignUpDTO} from "@/models/signUpDTO.ts";
import {signUp} from "@/services/authService.ts";

interface SignUpProps {
    isOpen: boolean,
    onOpenChange: () => void,
    loginOnOpen: () => void,
    email: string
}

const SignUp = ({isOpen, onOpenChange, loginOnOpen, email}: SignUpProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // Gather form data
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const contact = formData.get('contact') as string;
        const streetAddress = formData.get('streetAddress') as string;
        const password = formData.get('password') as string;

        // Build the sign-up data object
        const signUpDTO: SignUpDTO = {
            name: `${firstName} ${lastName}`,
            email: email,
            password: password,
            contact: contact,
            streetAddress: streetAddress,
            role: "USER" // Role is always USER for sign-up
        }

        // Call the signUp service
        signUp(signUpDTO).then(res => {
            if (res.statusCode === 201) {
                addToast({
                    title: "Sign Up Successful",
                    color: "success",
                });
                loginOnOpen();
            } else {
                addToast({
                    title: "Sign Up Failed",
                    color: "danger",
                    description: res.message || "An unexpected error occurred. Please try again later.",
                });
            }

        }).catch(error => {
            const backendResponse = error.response?.data;
            addToast({
                title: "Sign Up Failed",
                color: "danger",
                description: backendResponse?.message || "An unexpected error occurred.",
            });
        });
        onOpenChange();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='m-4 my-auto font-poppins' size={'md'} scrollBehavior={'inside'}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <h2 className='font-semibold'>Sign Up</h2>
                    <div className='w-full h-[1px] bg-gray-200 mt-1'></div>
                </ModalHeader>
                <ModalBody className='flex flex-col items-center scrollbar-hide'>
                    <h3 className='font-semibold'>Hello There!</h3>
                    <p className="text-sm font-normal max-w-96 text-center">
                        Glad to see you joining with us. Please fill up the following fields to set your account
                        up.
                    </p>
                    <div className="w-full ">
                        <Form onSubmit={onSubmit} className='flex flex-col gap-10 mt-8 w-full mb-4'>
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
                                        validate={value => value.length < 3 ? "First name must be at least 3 characters long." : null}
                                    />
                                    <Input
                                        name="lastName"
                                        isRequired
                                        label="Last name"
                                        variant='bordered'
                                        type="text"
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
                                <Input
                                    name="streetAddress"
                                    isRequired
                                    label="Street Address"
                                    variant='bordered'
                                    type="text"
                                    validate={value => value.length < 6 ? "Street address must be at least 3 characters long." : null}
                                />
                            </div>

                            {/*Password*/}
                            <div className='w-full'>
                                <h2 className='font-semibold text-lg mb-4'>Password</h2>
                                <div className='text-[12px] mb-1'>
                                    Please enter a strong password that meets the following criteria:
                                    <ul className='list-disc pl-5 mt-2'>
                                        <li>8–12 characters long</li>
                                        <li>At least one uppercase letter</li>
                                        <li>At least one lowercase letter</li>
                                        <li>At least one number</li>
                                        <li>At least one special character</li>
                                    </ul>
                                </div>
                                <div className='w-full py-2 flex flex-col gap-5 mt-3'>
                                    <Input
                                        endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                            >
                                                {isPasswordVisible ? (
                                                    <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        name="password"
                                        label="Password"
                                        type={isPasswordVisible ? "text" : "password"}
                                        variant="bordered"
                                        isRequired
                                        onValueChange={setPassword}
                                        validate={value => {
                                            if (!passwordRegex.test(value)) {
                                                return 'Password does not meet the criteria';
                                            }
                                        }}
                                    />
                                    <Input
                                        endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                            >
                                                {isConfirmPasswordVisible ? (
                                                    <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type={isConfirmPasswordVisible ? "text" : "password"}
                                        variant="bordered"
                                        isRequired
                                        validate={value => {
                                            if (value !== password) {
                                                return 'Passwords do not match';
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/*SignUp Btn*/}
                            <Button
                                type="submit"
                                color='primary'
                                className='w-full'
                            >
                                Sign Up
                            </Button>
                        </Form>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}


export default SignUp;