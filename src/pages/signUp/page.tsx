import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
} from "@heroui/react";
import {useState} from "react";

interface SignUpProps {
    isOpen?: boolean,
    onOpenChange?: () => void
}

type signUpData = {
    fName: string,
    lName: string,
    email: string,
    password: string,
    confirmPassword: string,
    contact: string,
    address: string,
    role: string
}

const SignUp = ({isOpen, onOpenChange}: SignUpProps) => {
    const [signUp, setSignUp] = useState<signUpData>({
        fName: "",
        lName: "",
        email: '',
        password: '',
        confirmPassword: "",
        contact: "",
        address: "",
        role: ""
    });

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='m-10' scrollBehavior={'inside'}>
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
                                Glad to see you joining with us. Please fill up the following fields to set your account up.
                            </p>
                            <div className="flex flex-col gap-5 mt-8 w-full px-2">
                                <div className='flex gap-5'>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        onChange={(e) => setSignUp({...signUp, fName: e.target.value})}
                                        className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        onChange={(e) => setSignUp({...signUp, lName: e.target.value})}
                                        className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setSignUp({...signUp, email: e.target.value})}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    onChange={(e) => setSignUp({...signUp, contact: e.target.value})}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    onChange={(e) => setSignUp({...signUp, address: e.target.value})}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setSignUp({...signUp, password: e.target.value})}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    onChange={(e) => setSignUp({...signUp, confirmPassword: e.target.value})}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <Button
                                    className="w-full h-12 bg-black text-white rounded-md flex justify-center items-center font-semibold"
                                    onPress={() => console.log(signUp)}
                                >
                                    Sign Up
                                </Button>
                                <div className='w-full flex justify-center items-center mb-5'>
                                    <p className='text-blue-500 text-sm cursor-pointer hover:underline'>Already have an account ? Login</p>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}


export default SignUp;