import {axiosInstance} from "@/api/axiosInstance.ts";

const SUB_URL: string = '/home-display-img';

export const getHomeDisplayImgByType = async (type: string) => {
    const response = await axiosInstance.get(SUB_URL + '/' + type);
    return response.data;
}