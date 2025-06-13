import axios from 'axios';
import { FilterProductDTO } from '../models/filterProductDTO';
import {PaginationDTO} from "@/models/paginationDTO.ts";
import axiosInstance from '../api/axiosInstance.ts';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
const SUB_URL: string = '/product';

export const getAllProducts = async () => {
    const response = await axios.get(API_BASE_URL + SUB_URL + '/all/products');
    return response.data.data;
}

export const getProductsByCategory = async (category: string)=> {
    const response = await axios.get(API_BASE_URL + SUB_URL + '/all/products/' + category);
    return response.data.data;
}

export const getProductById = async (id: string | undefined)=> {
    const response = await axios.get(API_BASE_URL + SUB_URL + '/' + id);
    return response.data.data;
}

export const getFilteredProducts = async (filterProductDTO: FilterProductDTO) => {
    const response = await axios.post(API_BASE_URL + SUB_URL + '/all/filter-products', filterProductDTO);
    return response.data.data;
}

export const getProductsByCategoryAndCount = async (category: string, count: number) => {
    const response = await axios.get(API_BASE_URL + SUB_URL + '/all/categoryAndCount', {
        params: {
            category: category,
            count: count
        }
    });
    return response.data.data;
}

export const getPopularProductsForAdmin = async (paginationDTO: PaginationDTO) => {
    const response = await axiosInstance.post(API_BASE_URL + SUB_URL + '/all/admin/popular-products', paginationDTO);
    return response.data.data;

}

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