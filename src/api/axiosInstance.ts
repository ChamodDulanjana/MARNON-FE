import axios from 'axios';
import { addToast } from "@heroui/react";
import { logout } from "@/services/authService";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

// Create base instances
export const axiosInstance = axios.create({ baseURL: API_BASE_URL });
export const axiosInstanceWithCredentials = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Setup interceptors — use function to access hook
export const setupAxiosInterceptors = (setIsLoading: (loading: boolean) => void) => {
    [axiosInstance, axiosInstanceWithCredentials].forEach(instance => {
        instance.interceptors.request.use(
            config => {
                setIsLoading(true);
                return config;
            },
            error => {
                setIsLoading(false);
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            response => {
                setIsLoading(false);
                return response;
            },
            error => {
                setIsLoading(false);
                if (error.response?.status === 401) {
                    logout().then(() => {
                        window.location.href = '/';
                    }).catch(err => {
                        addToast({
                            title: 'Error Occurred',
                            color: 'danger',
                            description: err.message || 'An error occurred.',
                        });
                    });
                }
                return Promise.reject(error);
            }
        );
    });
};
