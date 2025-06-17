import {axiosInstanceWithCredentials} from "@/api/axiosInstance.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
const SUB_URL: string = '/user-product';

export const getSalesCountByMonthAndYear = async (month: number, year: number) => {
    const response = await axiosInstanceWithCredentials.get(API_BASE_URL + SUB_URL + '/all/sales-count/by-month-year', {
        params: {
            month: month,
            year: year
        }
    });
    return response.data;
}

export const getSalesCountOfAllMonths = async () => {
    const response = await axiosInstanceWithCredentials.get(API_BASE_URL + SUB_URL + '/sales-count/of/all-months');
    return response.data.data;
}

export const getSalesCountOfDayRange = async (numberOfDays: number) => {
    const response = await axiosInstanceWithCredentials.get(API_BASE_URL + SUB_URL + '/sales-count/of/day-range/' + numberOfDays);
    return response.data.data;
}

export const getSalesCountByDate = async (date: string) => {
    const response = await axiosInstanceWithCredentials.get(API_BASE_URL + SUB_URL + '/sales-count/' + date);
    return response.data.data;
}

export const getMonthlySales = async (year: number, month: number) => {
    const response = await axiosInstanceWithCredentials.get(API_BASE_URL + SUB_URL + '/monthly-sales', {
        params: {
            year: year,
            month: month
        }
    });
    return response.data.data;
}

export const getMonthlyRevenue = async (year: number, month: number) => {
    const response = await axiosInstanceWithCredentials.get(API_BASE_URL + SUB_URL + '/monthly-revenue', {
        params: {
            year: year,
            month: month
        }
    });
    return response.data.data;
}