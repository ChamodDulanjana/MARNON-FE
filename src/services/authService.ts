import {SignInDTO} from "../models/signInDTO.ts";
import axios from "axios";


const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
const SUB_URL: string = '/auth';

export const signIn = async (signInDTO: SignInDTO) => {
    const response = await axios.post(API_BASE_URL + SUB_URL + '/signin', signInDTO);
    return response.data;
}