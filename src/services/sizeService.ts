import axiosInstance from '../api/axiosInstance.ts';

const SUB_URL: string = '/size';

export const getAllActiveSizes = async () => {
    try {
        const response = await axiosInstance.get(SUB_URL + '/all/active-sizes');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching all active sizes:', error);
        throw error;
    }
}