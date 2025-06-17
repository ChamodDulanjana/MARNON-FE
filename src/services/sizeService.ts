import {axiosInstance} from "@/api/axiosInstance.ts";

const SUB_URL: string = '/size';

export const getAllActiveSizes = async () => {
    const response = await axiosInstance.get(SUB_URL + '/all/active-sizes');
    return response.data.data;
}