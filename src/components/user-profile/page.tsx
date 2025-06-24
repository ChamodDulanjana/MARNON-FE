import {addToast, Avatar, Button, Form, Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/react";
import { CiEdit } from "react-icons/ci";
import {useEffect, useState} from "react";
import {UserUpdateDTO} from "../../models/userUpdateDTO.ts";
import {getUserByEmail, updateByRegularUser} from "../../services/userService.ts";
import * as React from "react";
import {useAuthContext} from "@/context/authContext.tsx";
import {Input} from "@heroui/input";
import {contactRegex} from "@/util/regexPattens.ts";

interface UserProfileProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

interface UserDataProps {
    fName: string;
    lName: string;
    contact: string;
    streetAddress: string;
}

const UserProfile = ({isOpen, onOpenChange}: UserProfileProps) => {
    const { userName } = useAuthContext();
    const [userId, setUserId] = useState(0);
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
    const [userData, setUserData] = useState<UserDataProps>({
        fName: '',
        lName: '',
        contact: '',
        streetAddress: ''
    });

    // Reset form fields when the modal opens
    useEffect(() => {
        setIsEditBtnClicked(false);
        setUserData({
            fName: '',
            lName: '',
            contact: '',
            streetAddress: ''
        });
    }, [isOpen]);

    // Fetch user data from the server
    useEffect(() => {
        getUserByEmail(userName).then(res => {
            if (res.statusCode === 200) {
                setUserId(res.data.id);
                setUserData({
                    fName: res.data.name.split(' ')[0] || '',
                    lName: res.data.name.split(' ')[1] || '',
                    contact: res.data.contact || '',
                    streetAddress: res.data.streetAddress || ''
                });
            } else {
                addToast({
                    title: "Failed to fetch user data",
                    color: "danger",
                });
            }

        }).catch(error => {
            addToast({
                title: "Error fetching user data",
                color: "danger",
                description: error.message,
            });
        });
    }, [userName]);

    const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isEditBtnClicked) return; // 🚫 Prevent accidental submission when not editing

        // Build the user update DTO
        const userDTO: UserUpdateDTO = {
            name: `${userData.fName} ${userData.lName}`,
            contact: userData.contact,
            streetAddress: userData.streetAddress,
        }

        // Call the update service
        updateByRegularUser(userId, userDTO).then(res => {
            if (res.statusCode === 200) {
                addToast({
                    title: "Profile Updated Successfully",
                    color: "success",
                });
                setIsEditBtnClicked(false);
            } else {
                addToast({
                    title: "Update Failed",
                    color: "danger",
                    description: res.message,
                });
            }
            onOpenChange();

        }).catch(error => {
            addToast({
                title: "Error Updating Profile",
                color: "danger",
                description: error.message,
            });
        });
        onOpenChange();
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'} size={'lg'} className='m-4 my-auto'>
            <ModalContent>
                <ModalHeader className='flex flex-col gap-2'>
                    <h1 className='text-xl'>User Profile</h1>
                    <div className='w-full h-px bg-gray-300'></div>
                </ModalHeader>
                <ModalBody className='flex flex-col justify-start items-center gap-10 pb-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <Avatar
                            name={userName ? userName[0].toUpperCase() : ''}
                            className='text-[16px] w-16 h-16 rounded-full border-gray-300'
                        />
                        <p className=' font-semibold mt-2'>{userName}</p>
                    </div>
                    <Form onSubmit={handleUserUpdate} className="flex flex-col w-full px-2">
                        <div className='flex gap-5 w-full'>
                            <Input
                                name="firstName"
                                isRequired
                                disabled={!isEditBtnClicked}
                                label="First name"
                                labelPlacement='outside'
                                variant='bordered'
                                type="text"
                                value={userData.fName}
                                onChange={(e) => setUserData({...userData, fName: e.target.value})}
                                validate={value => value.length < 3 ? "First name must be at least 3 characters long." : null}
                            />
                            <Input
                                name="lastName"
                                isRequired
                                disabled={!isEditBtnClicked}
                                label="Last name"
                                labelPlacement='outside'
                                variant='bordered'
                                type="text"
                                value={userData.lName}
                                onChange={(e) => setUserData({...userData, lName: e.target.value})}
                                validate={value => value.length < 3 ? "Last name must be at least 3 characters long." : null}
                            />
                        </div>
                        <div className='w-full mt-5'>
                            <Input
                                name="contact"
                                isRequired
                                disabled={!isEditBtnClicked}
                                label="Contact"
                                labelPlacement='outside'
                                variant='bordered'
                                type="text"
                                value={userData.contact}
                                onChange={(e) => setUserData({...userData, contact: e.target.value})}
                                validate={value => {
                                    if (!contactRegex.test(value)){
                                        return "Please enter a valid contact number (9-15 digits).";
                                    }
                                }}
                            />
                        </div>
                        <div className='w-full mt-5'>
                            <Input
                                name="streetAddress"
                                isRequired
                                disabled={!isEditBtnClicked}
                                label="Street Address"
                                labelPlacement='outside'
                                variant='bordered'
                                type="text"
                                value={userData.streetAddress}
                                onChange={(e) => setUserData({...userData, streetAddress: e.target.value})}
                                validate={value => value.length < 6 ? "Street address must be at least 3 characters long." : null}
                            />
                        </div>

                        {/*Button section*/}
                        <div className='w-full flex justify-end items-center gap-3 mt-5'>
                            {isEditBtnClicked ? (
                                <Button
                                    type="submit"
                                    className="w-28 bg-blue-600 text-white rounded-md flex justify-center items-center"
                                >
                                    <CiEdit className='text-[20px]' />
                                    <span className='ml-1'>Update</span>
                                </Button>
                            ) : (
                                <button
                                    className="w-28 py-2 bg-yellow-500 text-black rounded-md flex justify-center items-center"
                                    onClick={() => setIsEditBtnClicked(true)}
                                >
                                    <CiEdit className='text-[20px]' />
                                    <span className='ml-1'>Edit</span>
                                </button>
                            )}
                        </div>
                    </Form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default UserProfile;