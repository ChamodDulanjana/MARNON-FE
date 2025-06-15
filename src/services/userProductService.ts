import axiosInstance from "@/api/axiosInstance.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
const SUB_URL: string = '/user-product';

export const getProductSalesByMonthAndYear = async (month: number, year: number) => {
    const response = await axiosInstance.get(API_BASE_URL + SUB_URL + '/all/product/sales/by-month-year', {
        params: {
            month: month,
            year: year
        }
    });
    return response.data;
}

export const getAllSalesInMonths = async () => {
    const response = await axiosInstance.get(API_BASE_URL + SUB_URL + '/all/sales/in-months');
    return response.data.data;
}

export const getAllSalesInDays = async (numberOfDays: number) => {
    const response = await axiosInstance.get(API_BASE_URL + SUB_URL + '/all/sales/in-days/' + numberOfDays);
    return response.data.data;
}