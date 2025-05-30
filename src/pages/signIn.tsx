import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
} from "@heroui/react";
import {useEffect, useState} from "react";
import {signIn} from "../services/authService.ts";
import {SignInDTO} from "../models/signInDTO.ts";
import {addToast} from "@heroui/react";
import {saveToStorage} from "../services/storageService.ts";
import * as React from "react";


interface SignInProps {
    isOpen: boolean,
    onOpenChange: () => void
    loginOnClose: () => void
    signupOnOpen: () => void
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignIn = ({isOpen, onOpenChange, loginOnClose, signupOnOpen}: SignInProps) => {
    const [login, setLogin] = useState<SignInDTO>({email: '', password: ''});
    const [emailError, setEmailError] = useState<string | null>('');
    const [passwordError, setPasswordError] = useState<string | null>('');

    useEffect(() => {
        if (isOpen) {
            setLogin({ email: '', password: '' });
            setEmailError('');
            setPasswordError('');
        }
    }, [isOpen]);


    const handleSignUp = () => {
        signupOnOpen();
        loginOnClose();
    }

    const handleLogin = async () => {
        // Validate email and password before making the API call
        if (login.email.trim() === '') {
            setEmailError("Please enter your email.");
        } else if (!emailRegex.test(login.email)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError(null);
        }

        if (login.password.trim() === '') {
            setPasswordError("Please enter your password.");
        } else {
            setPasswordError(null);
        }

        if (emailError === null && passwordError === null) {
            console.log('both fields are valid, proceeding with login...');
            console.log(login)
            const response = await signIn(login);
            if (response.statusCode === 200) {
                // save user details in session storage
                saveToStorage(response.data);

                addToast({
                    title: "Login Successful",
                    color: "success",
                });
            } else if (response.statusCode === 401) {
                addToast({
                    title: "Login Failed",
                    color: "danger",
                    description: "Please check your email and password.",
                });
            } else {
                addToast({
                    title: "Login Failed",
                    color: "danger",
                    description: "An unexpected error occurred. Please try again later.",
                });
            }
            loginOnClose();
        }

    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setLogin({...login, email});

        if (email.trim() === '') {
            setEmailError("Please enter your email.");
        } else if (!emailRegex.test(email)){
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError(null);
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setLogin({...login, password});

        if (password.trim() === '') {
            setPasswordError("Please enter your password.");
        } else {
            setPasswordError(null);
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='m-10' scrollBehavior={'inside'}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className='font-semibold'>Login</h2>
                            <div className='w-full h-[1px] bg-gray-200 mt-1'></div>
                        </ModalHeader>
                        <ModalBody className='flex flex-col items-center'>
                            <h3 className='font-semibold'>Hello There!</h3>
                            <p className="text-sm font-semibold w-60 text-center">
                                Welcome 😊 you’ve been missed. Please enter your data to log in.
                            </p>
                            <div className="flex flex-col mt-8 w-full px-2">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => handleEmailChange(e)}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <p className='text-red-500 text-[13px]'>{emailError}</p>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => handlePasswordChange(e)}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-5"
                                />
                                <p className='text-red-500 text-[13px]'>{passwordError}</p>
                                <div className="w-full flex justify-end items-center mt-5">
                                    <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                                </div>
                                <Button
                                    className="w-full h-12 bg-black text-white rounded-md flex justify-center items-center font-semibold mt-5"
                                    onPress={() => handleLogin()}
                                >
                                    Login
                                </Button>
                                <div className='w-full flex justify-center items-center my-5'>
                                    <p
                                        onClick={handleSignUp}
                                        className='text-blue-500 text-sm cursor-pointer hover:underline'
                                    >Don't have an account ? Sign up
                                    </p>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}


export default SignIn;