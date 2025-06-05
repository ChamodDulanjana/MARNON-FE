import axios from "axios";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
const SUB_URL: string = '/home-display-img';

export const getHomeDisplayImgByType = async (type: string) => {
    const response = await axios.get(API_BASE_URL + SUB_URL + '/' + type);
    return response.data;
}