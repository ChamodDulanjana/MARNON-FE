import {addToast, Avatar, Button, Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/react";
import { CiEdit } from "react-icons/ci";
import {useEffect, useState} from "react";
import {UserUpdateDTO} from "../../models/userUpdateDTO.ts";
import {getUserById, updateByRegularUser} from "../../services/userService.ts";
import * as React from "react";

interface UserProfileProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

interface UserDataProps {
    fName: string;
    lName: string;
    contact: string;
    address: string;
}

const contactRegex = /^\d{9,15}$/;

const UserProfile = ({isOpen, onOpenChange}: UserProfileProps) => {
    const [userName] = useState(sessionStorage.getItem('userName') || '')
    const [userId] = useState(Number(sessionStorage.getItem('userId')) || 0)
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
    const [userData, setUserData] = useState<UserDataProps>({
        fName: '',
        lName: '',
        contact: '',
        address: ''
    });
    const [nameError, setNameError] = useState<string | null>('');
    const [contactError, setContactError] = useState<string | null>('');
    const [addressError, setAddressError] = useState<string | null>('');

    useEffect(() => {
        setIsEditBtnClicked(false);
        setUserData({
            fName: '',
            lName: '',
            contact: '',
            address: ''
        });
        setNameError('');
        setContactError('');
        setAddressError('');
    }, [isOpen]);

    // Fetch user data from the server
    useEffect(() => {
        const fetchUserById = async () => {
            const response = await getUserById(userId);
            if (response.statusCode === 200) {
                setUserData({
                    fName: response.data.name.split(' ')[0],
                    lName: response.data.name.split(' ')[1],
                    contact: response.data.contact,
                    address: response.data.address
                });
            }
        }

        fetchUserById();
    }, [userId]);

    const handleUserUpdate = async () => {
        // Validate all fields before updating
        const fNameErr = validateFirstName(userData.fName);
        validateLastName(userData.lName);
        const contactErr = validateContact(userData.contact);
        const addressErr = validateAddress(userData.address);

        setNameError(fNameErr);
        setContactError(contactErr);
        setAddressError(addressErr);

        // If there are no errors, proceed with the update
        if (!fNameErr && !contactErr && !addressErr) {
            const userDTO: UserUpdateDTO = {
                name: `${userData.fName} ${userData.lName}`,
                contact: userData.contact,
                address: userData.address,
                role: 'null' // Role is not being updated by regular users
            }

            const response = await updateByRegularUser(userId, userDTO);
            if (response.statusCode === 200) {
                addToast({
                    title: "User profile updated successfully",
                    color: "success",
                });
                onOpenChange(); // Close the modal after successful update
            } else {
                addToast({
                    title: "Failed to update user profile",
                    color: "danger",
                });
            }
        }
    }

    const handleEditBtnClick = () => {
        setIsEditBtnClicked(true);
    }


    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setUserData({...userData, fName: value});
        validateFirstName(value);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setUserData({...userData, lName: value});
        validateLastName(value);
    }

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setUserData({...userData, contact: value});
        validateContact(value);
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setUserData({...userData, address: value});
        validateAddress(value);
    }

    const validateFirstName = (value: string): string | null => {
        if (value.trim() === '') {
            setNameError("Both first and last names are required.");
            return "Both first and last names are required.";
        } else if (userData.lName.trim() === '') {
            setNameError("Both first and last names are required.");
            return "Both first and last names are required.";
        }
        setNameError(null);
        return null;
    }

    const validateLastName = (value: string): string | null => {
        if (value.trim() === '') {
            setNameError("Both first and last names are required.");
            return "Both first and last names are required.";
        } else if (userData.fName.trim() === '') {
            setNameError("Both first and last names are required.");
            return "Both first and last names are required.";
        }
        setNameError(null);
        return null;
    }

    const validateContact = (value: string): string | null => {
        if (value.trim() === '') {
            setContactError("Please enter your contact number.");
            return "Please enter your contact number.";
        } else if (!contactRegex.test(value)) {
            setContactError("Please enter a valid contact number (9-15 digits).");
            return "Please enter a valid contact number (9-15 digits).";
        }
        setContactError(null);
        return null;
    }

    const validateAddress = (value: string) => {
        if (value.trim() === '') {
            setAddressError("Please enter your address.");
            return "Please enter your address.";
        };
        setAddressError(null);
        return null;
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'} size={'lg'} className='m-4 my-auto'>
            <ModalContent>
                <ModalHeader className='flex flex-col gap-2'>
                    <h1 className='text-xl'>User Profile</h1>
                    <div className='w-full h-px bg-gray-300'></div>
                </ModalHeader>
                <ModalBody className='flex flex-col justify-start items-center gap-10 my-5'>
                    <div className='flex flex-col justify-center items-center'>
                        <Avatar
                            name={userName ? userName[0].toUpperCase() : ''}
                            className='text-[16px] w-16 h-16 rounded-full border-gray-300'
                        />
                        <p className=' font-semibold mt-2'>{userName}</p>
                    </div>
                    <div className="flex flex-col w-full px-2">
                        <div className='flex gap-5'>
                            <div className='w-full'>
                                <label className='text-[13px]'>First name</label>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    value={userData.fName}
                                    disabled={!isEditBtnClicked}
                                    onChange={(e) => {handleFirstNameChange(e)}}
                                    className={`w-full text-sm h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-1 
                                        ${isEditBtnClicked ? 'bg-green-100' : ''}
                                    `}
                                />
                            </div>
                            <div className='w-full'>
                                <label className='text-[13px]'>Last name</label>
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    value={userData.lName}
                                    disabled={!isEditBtnClicked}
                                    onChange={(e) => {handleLastNameChange(e)}}
                                    className={`w-full text-sm h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-1 
                                        ${isEditBtnClicked ? 'bg-green-100' : ''}
                                    `}
                                />
                            </div>
                        </div>
                        <p className='text-red-500 text-[13px]'>{nameError}</p>
                        <div className='w-full mt-5'>
                            <label className='text-[13px]'>Contact</label>
                            <input
                                type="text"
                                placeholder="Contact"
                                value={userData.contact}
                                disabled={!isEditBtnClicked}
                                onChange={(e) => {handleContactChange(e)}}
                                className={`w-full text-sm h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-1 
                                        ${isEditBtnClicked ? 'bg-green-100' : ''}
                                    `}
                            />
                        </div>
                        <p className='text-red-500 text-[13px]'>{contactError}</p>
                        <div className='w-full mt-5'>
                            <label className='text-[13px]'>Address</label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={userData.address}
                                disabled={!isEditBtnClicked}
                                onChange={(e) => {handleAddressChange(e)}}
                                className={`w-full text-sm h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-black mt-1 
                                        ${isEditBtnClicked ? 'bg-green-100' : ''}
                                    `}
                            />
                        </div>
                        <p className='text-red-500 text-[13px]'>{addressError}</p>

                        {/*Button section*/}
                        <div className='w-full flex justify-end items-center gap-3 mt-5'>
                            {isEditBtnClicked ? (
                                <Button
                                    className="w-28 bg-blue-600 text-white rounded-md flex justify-center items-center"
                                    onPress={() => handleUserUpdate()}
                                    disabled={false}
                                >
                                    <CiEdit className='text-[20px]' />
                                    <span className='ml-1'>Update</span>
                                </Button>
                            ) : (
                                <Button
                                    className="w-28 bg-yellow-500 text-black rounded-md flex justify-center items-center"
                                    onPress={() => handleEditBtnClick()}
                                >
                                    <CiEdit className='text-[20px]' />
                                    <span className='ml-1'>Edit</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default UserProfile;