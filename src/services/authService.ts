import {SignInDTO} from "../models/signInDTO.ts";
import {axiosInstance, axiosInstanceWithCredentials} from "@/api/axiosInstance.ts";

const SUB_URL: string = '/auth';

export const signIn = async (signInDTO: SignInDTO) => {
    const response = await axiosInstanceWithCredentials.post(SUB_URL + '/signin', signInDTO);
    return response.data;
}

export const signUp = async (signUpDTO: SignInDTO) => {
    const response = await axiosInstance.post(SUB_URL + '/signup', signUpDTO);
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstanceWithCredentials.patch(SUB_URL + '/logout');
    return response.data;
}