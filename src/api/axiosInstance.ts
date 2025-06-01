import axios from 'axios';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;