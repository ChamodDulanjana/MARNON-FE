import axiosInstance from "../api/axiosInstance.ts";

const SUB_URL: string = '/user';

export const getUserById = async (userId: number) => {
    const response = await axiosInstance.get(SUB_URL + '/' + userId);
    return response.data;
}
