import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button, addToast,
} from "@heroui/react";
import {useEffect, useState} from "react";
import * as React from "react";
import {SignUpDTO} from "@/models/signUpDTO.ts";
import {signUp} from "@/services/authService.ts";
import {passwordRegex} from "@/util/regexPattens.ts";
import {contactRegex} from "@/util/regexPattens.ts";

interface SignUpProps {
    isOpen: boolean,
    onOpenChange: () => void,
    loginOnOpen: () => void,
    email: string
}

type signUpData = {
    fName: string,
    lName: string,
    password: string,
    confirmPassword: string,
    contact: string,
    address: string,
}

const SignUp = ({isOpen, onOpenChange, loginOnOpen, email}: SignUpProps) => {
    const [signUpData, setSignUpData] = useState<signUpData>({
        fName: "",
        lName: "",
        password: '',
        confirmPassword: "",
        contact: "",
        address: "",
    });
    const [nameError, setNameError] = useState<string | null>('');
    const [passwordError, setPasswordError] = useState<string | null>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>('');
    const [contactError, setContactError] = useState<string | null>('');
    const [addressError, setAddressError] = useState<string | null>('');

    useEffect(() => {
        setNameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setContactError('');
        setAddressError('');
        setSignUpData({
            fName: "",
            lName: "",
            password: '',
            confirmPassword: "",
            contact: "",
            address: "",
        });
    }, [isOpen]);

    const handleSignUp = async () => {
        // Validate fields before proceeding
        validateFirstName(signUpData.fName);
        validateLastName(signUpData.lName);
        validateContact(signUpData.contact);
        validateAddress(signUpData.address);
        validatePassword(signUpData.password);
        validateConfirmPassword(signUpData.confirmPassword);

        // If all validations pass, proceed with sign-up
        if (nameError === null &&
            passwordError === null &&
            confirmPasswordError === null &&
            contactError === null &&
            addressError === null) {

            const signUpDTO: SignUpDTO = {
                name: `${signUpData.fName} ${signUpData.lName}`,
                email: email,
                password: signUpData.password,
                contact: signUpData.contact,
                address: signUpData.address,
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
                onOpenChange();

            }).catch(error => {
                const backendResponse = error.response?.data;
                addToast({
                    title: "Sign Up Failed",
                    color: "danger",
                    description: backendResponse?.message || "An unexpected error occurred.",
                });
            });
            onOpenChange();
        }
    }

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSignUpData({...signUpData, fName: value});
        validateFirstName(value);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSignUpData({...signUpData, lName: value});
        validateLastName(value);
    }

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSignUpData({...signUpData, contact: value});
        validateContact(value);
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSignUpData({...signUpData, address: value});
        validateAddress(value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSignUpData({...signUpData, password: value});
        validatePassword(value);
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSignUpData({...signUpData, confirmPassword: value});
        validateConfirmPassword(value);
    }

    const validateFirstName = (value: string) => {
        if (value.trim() === '') {
            setNameError("Both first and last names are required.");
        } else if (signUpData.lName.trim() === '') {
            setNameError("Both first and last names are required.");
        } else {
            setNameError(null);
        }
    }

    const validateLastName = (value: string) => {
        if (value.trim() === '') {
            setNameError("Both first and last names are required.");
        } else if (signUpData.fName.trim() === '') {
            setNameError("Both first and last names are required.");
        } else {
            setNameError(null);
        }
    }

    const validateContact = (value: string) => {
        if (value.trim() === '') {
            setContactError("Please enter your contact number.");
        } else if (!contactRegex.test(value)) {
            setContactError("Please enter a valid contact number (9-15 digits).");
        } else {
            setContactError(null);
        }
    }

    const validateAddress = (value: string) => {
        if (value.trim() === '') {
            setAddressError("Please enter your address.");
        } else {
            setAddressError(null);
        }
    }

    const validatePassword = (value: string) => {
        if (value.trim() === '') {
            setPasswordError("Please enter your password.");
        } else if (!passwordRegex.test(value)) {
            setPasswordError(
                `Password should be:\n` +
                `• 8–12 characters long\n` +
                `• At least one uppercase letter\n` +
                `• At least one lowercase letter\n` +
                `• At least one number\n` +
                `• At least one special character`
            );
        } else {
            setPasswordError(null);
        }
    }

    const validateConfirmPassword = (value: string) => {
        if (value.trim() === '') {
            setConfirmPasswordError("Please confirm your password.");
        } else if (value !== signUpData.password) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError(null);
        }
    }


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='m-4 my-auto' scrollBehavior={'inside'}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className='font-semibold'>Sign Up</h2>
                            <div className='w-full h-[1px] bg-gray-200 mt-1'></div>
                        </ModalHeader>
                        <ModalBody className='flex flex-col items-center'>
                            <h3 className='font-semibold'>Hello There!</h3>
                            <p className="text-sm font-semibold w-60 text-center">
                                Glad to see you joining with us. Please fill up the following fields to set your account
                                up.
                            </p>
                            <div className="flex flex-col mt-8 w-full px-2 mb-4">
                                <div className='flex gap-5'>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        onChange={(e) => handleFirstNameChange(e)}
                                        className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        onChange={(e) => handleLastNameChange(e)}
                                        className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                </div>
                                <p className='text-red-500 text-[13px]'>{nameError}</p>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    readOnly
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-5"
                                />
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    onChange={(e) => handleContactChange(e)}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-5"
                                />
                                <p className='text-red-500 text-[13px]'>{contactError}</p>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    onChange={(e) => handleAddressChange(e)}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-5"
                                />
                                <p className='text-red-500 text-[13px]'>{addressError}</p>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => handlePasswordChange(e)}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-5"
                                />
                                <p className='text-red-500 text-[13px]'>
                                    {passwordError && (
                                        <div className="text-red-500 text-[13px] mt-2">
                                            {passwordError.split('\n').map((line, index) => (
                                                <p key={index}>{line}</p>
                                            ))}
                                        </div>
                                    )}

                                </p>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    onChange={(e) => handleConfirmPasswordChange(e)}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-5"
                                />
                                <p className='text-red-500 text-[13px]'>{confirmPasswordError}</p>
                                <Button
                                    className="w-full h-12 bg-black text-white rounded-md flex justify-center items-center font-semibold mt-8"
                                    onPress={() => handleSignUp()}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}


export default SignUp;