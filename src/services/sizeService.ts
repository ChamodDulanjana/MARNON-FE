import axios from "axios";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
const SUB_URL: string = '/size';

export const getAllActiveSizes = async () => {
    const response = await axios.get(API_BASE_URL + SUB_URL + '/all/active-sizes');
    return response.data.data;
}