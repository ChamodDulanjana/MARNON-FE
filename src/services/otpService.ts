import {axiosInstance} from "@/api/axiosInstance.ts";

const SUB_URL: string = '/otp';

export const sendOtpForSignup = async (email: string) => {
    const response = await axiosInstance.post(`${SUB_URL}/${email}`);
    return response.data;
};

export const verifyOtp = async (email: string, otpCode: string) => {
    const response = await axiosInstance.patch(SUB_URL + `/verify/${email}/${otpCode}`);
    return response.data;
};