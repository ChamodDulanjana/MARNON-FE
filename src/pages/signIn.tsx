import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
} from "@heroui/react";
import {useState} from "react";

interface SignInProps {
    isOpen: boolean,
    onOpenChange: () => void
    loginOnClose: () => void
    signupOnOpen: () => void
}

type loginData = {
    email: string,
    password: string
}

const SignIn = ({isOpen, onOpenChange, loginOnClose, signupOnOpen}: SignInProps) => {
    const [login, setLogin] = useState<loginData>({email: '', password: ''});

    const handleSignUp = () => {
        signupOnOpen();
        loginOnClose();
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
                            <div className="flex flex-col gap-5 mt-8 w-full px-2">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setLogin({...login, email: e.target.value})}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setLogin({...login, password: e.target.value})}
                                    className="w-full h-12 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <div className="w-full flex justify-end items-center">
                                    <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                                </div>
                                <Button
                                    className="w-full h-12 bg-black text-white rounded-md flex justify-center items-center font-semibold"
                                    onPress={() => console.log(login)}
                                >
                                    Login
                                </Button>
                                <div className='w-full flex justify-center items-center mb-5'>
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