import axios from 'axios';
import { FilterProductDTO } from '../models/filterProductDTO';


const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
const SUB_URL: string = '/product';


export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_BASE_URL + SUB_URL + '/all/products');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export const getProductsByCategory = async (category: string)=> {
    try {
        const response = await axios.get(API_BASE_URL + SUB_URL + '/all/products/' + category);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
}

export const getProductById = async (id: string | undefined)=> {
    try {
        const response = await axios.get(API_BASE_URL + SUB_URL + '/' + id);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product id- ${id}:`, error);
        throw error;
    }
}

export const getFilteredProducts = async (FilterProductDTO: FilterProductDTO) => {
    try {
        const response = await axios.post(API_BASE_URL + SUB_URL + '/all/filter-products', FilterProductDTO);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        throw error;
    }
}