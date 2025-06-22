import {Button, Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/react";
import {useEffect, useState} from "react";
import * as React from "react";
import {emailRegex} from "@/util/regexPattens.ts";
import {MdOutlineVerifiedUser} from "react-icons/md";
import {addToast} from "@heroui/react";
import {sendOtpForSignup, verifyOtp} from "@/services/otpService.ts";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp.tsx";
import {REGEXP_ONLY_DIGITS} from "input-otp";

interface VerifyEmailProps {
    isOpen: boolean,
    onOpenChange: () => void,
    signupOnOpen: () => void,
    setEmailSignUp: (value: string) => void,
}

const VerifyEmail = ({isOpen, onOpenChange, signupOnOpen, setEmailSignUp}: VerifyEmailProps) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>('');
    const [isVerifyBtnClicked, setIsVerifyBtnClicked] = useState(false);
    const [disableOTP, setDisableOTP] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);

    // Clean up the component state when it unmounts
    useEffect(() => {
        return () => {
            setEmail('');
            setEmailError('');
            setIsVerifyBtnClicked(false);
            setDisableOTP(false);
            setIsOtpSent(true);
        };
    }, [setEmail]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        validateEmail(email);
    }

    const validateEmail = (email: string) => {
        if (email.trim() === '') {
            setEmailError("Please enter your email.");
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError(null);
        }
    }

    const handleVerifyEmailBtn = () => {
        if (emailError === null) {
            sendOtpForSignup(email).then(resp => {
                if (resp.statusCode === 200) {
                    setIsVerifyBtnClicked(true);
                    setIsOtpSent(true);
                } else {
                    addToast({
                        title: "Error Verifying Email",
                        color: "danger",
                        description: resp.message || "An unexpected error occurred.",
                    });
                }
            }).catch(error => {
                const backendResponse = error.response?.data;
                addToast({
                    title: "Error",
                    color: "danger",
                    description: backendResponse?.message || "An unexpected error occurred.",
                });
            })
        } else {
            setEmailError('Please enter your email.');
        }
    }

    const handleVerifyOTP = (value: string) => {
        // Check if the value is a valid OTP
        if (value.length === 6) {
            setDisableOTP(true);

            verifyOtp(email, value).then(resp => {
                if (resp.statusCode === 200) {
                    addToast({
                        title: "Email Verified",
                        color: "success",
                        description: "Your email has been successfully verified.",
                    });
                    setEmailSignUp(email);
                    signupOnOpen();
                } else {
                    addToast({
                        title: "Error Verifying OTP",
                        color: "danger",
                        description: resp.message || "An unexpected error occurred.",
                    });
                }
                onOpenChange();
            }).catch(error => {
                const backendResponse = error.response?.data;
                addToast({
                    title: "Error",
                    color: "danger",
                    description: backendResponse?.message || "An unexpected error occurred.",
                });
                onOpenChange();
            });
        }
    }

    const resendOtp = () => {
        if (emailError === null) {
            sendOtpForSignup(email).then(resp => {
                if (resp.statusCode === 200) {
                    setIsOtpSent(true);
                    addToast({
                        title: "OTP Resent",
                        color: "success",
                        description: "A new OTP has been sent to your email.",
                    });
                } else {
                    addToast({
                        title: "Error",
                        color: "danger",
                        description: resp.message || "An unexpected error occurred.",
                    });
                }
            }).catch(error => {
                const backendResponse = error.response?.data;
                addToast({
                    title: "Error",
                    color: "danger",
                    description: backendResponse?.message || "An unexpected error occurred.",
                });
            });
        }
    }

    // set isOtpSent to false after 2 minutes
    useEffect(() => {
        if (isOtpSent) {
            const timer = setTimeout(() => {
                setIsOtpSent(false);
            }, 120000); // 2 minutes

            return () => clearTimeout(timer);
        }
    }, [isOtpSent]);

    return (
        <>
            {isVerifyBtnClicked ? (
                /*OTP Verification*/
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"md"} className='m-4 my-auto overflow-hidden'>
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className='font-semibold'>Enter your OTP</h2>
                            <div className='w-full h-[1px] bg-gray-200 mt-1'></div>
                        </ModalHeader>
                        <ModalBody className='flex flex-col items-center'>
                            <div className='w-full'>
                                <p className="text-sm font-semibold  ">
                                    We have sent an OTP to your email address. Please enter the OTP to verify your
                                    email.
                                </p>
                            </div>

                            {/*Input OTP*/}
                            <div className='my-6 w-full flex justify-center items-center'>
                                <InputOTP
                                    maxLength={6}
                                    pattern={REGEXP_ONLY_DIGITS}
                                    disabled={disableOTP}
                                    onChange={(value) => handleVerifyOTP(value)}
                                    autoFocus
                                >
                                    <InputOTPGroup className='gap-2'>
                                        <InputOTPSlot index={0}/>
                                        <InputOTPSlot index={1}/>
                                        <InputOTPSlot index={2}/>
                                        <InputOTPSlot index={3}/>
                                        <InputOTPSlot index={4}/>
                                        <InputOTPSlot index={5}/>
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>


                            <div className='w-full flex flex-col justify-center items-center mb-5'>
                                <p className='text-gray-500 text-sm text-center'>
                                    Don't receive the OTP?
                                    <span
                                        onClick={resendOtp}
                                        className={`ml-2  ${isOtpSent ? 'text-gray-500 opacity-50 cursor-not-allowed' : 'text-blue-500 text-sm cursor-pointer hover:underline'}`}
                                    >
                                        Resend OTP
                                    </span>
                                </p>
                                <div className='flex flex-col items-center '>
                                    <span className='text-gray-500 block'>or</span>
                                    <span
                                        onClick={() => setIsVerifyBtnClicked(false)}
                                        className='text-blue-500 text-sm cursor-pointer hover:underline text-center'
                                    >
                                        Change Email
                                    </span>
                                </div>
                            </div>

                        </ModalBody>
                    </ModalContent>
                </Modal>
            ) : (

                /*Verify Email*/
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"md"} className='m-4 my-auto overflow-hidden'>
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className='font-semibold'>Verify Email</h2>
                            <div className='w-full h-[1px] bg-gray-200 mt-1'></div>
                        </ModalHeader>
                        <ModalBody className='flex flex-col items-center'>
                            <div className='w-full'>
                                <p className="text-sm font-semibold  ">
                                    Please enter your email address to verify your email address.
                                </p>
                            </div>
                            <div className="flex flex-col my-4 w-full">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => handleEmailChange(e)}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <p className='text-red-500 text-[13px]'>{emailError}</p>
                                <div className='w-full flex justify-end'>
                                    <Button
                                        className="w-36 h-12 bg-black text-white rounded-md flex justify-center items-center font-semibold mt-5"
                                        onPress={() => handleVerifyEmailBtn()}
                                    >
                                        <MdOutlineVerifiedUser className='text-lg'/>
                                        Verify Email
                                    </Button>
                                </div>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

export default VerifyEmail;