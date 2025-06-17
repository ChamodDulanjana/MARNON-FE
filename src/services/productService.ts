import { FilterProductDTO } from '../models/filterProductDTO';
import {PaginationDTO} from "@/models/paginationDTO.ts";
import {axiosInstance, axiosInstanceWithCredentials} from '../api/axiosInstance.ts';

const SUB_URL: string = '/product';

export const getAllProducts = async () => {
    const response = await axiosInstance.get(SUB_URL + '/all/products');
    return response.data.data;
}

export const getProductsByCategory = async (category: string)=> {
    const response = await axiosInstance.get(SUB_URL + '/all/products/' + category);
    return response.data.data;
}

export const getProductById = async (id: string | undefined)=> {
    const response = await axiosInstance.get(SUB_URL + '/' + id);
    return response.data.data;
}

export const getFilteredProducts = async (filterProductDTO: FilterProductDTO) => {
    const response = await axiosInstance.post(SUB_URL + '/all/filter-products', filterProductDTO);
    return response.data.data;
}

export const getProductsByCategoryAndCount = async (category: string, count: number) => {
    const response = await axiosInstance.get(SUB_URL + '/all/categoryAndCount', {
        params: {
            category: category,
            count: count
        }
    });
    return response.data.data;
}

export const getPopularProductsForAdmin = async (paginationDTO: PaginationDTO) => {
    const response = await axiosInstanceWithCredentials.post(SUB_URL + '/all/admin/popular-products', paginationDTO);
    return response.data.data;
}