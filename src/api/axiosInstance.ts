import axios from 'axios';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        //config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtaXJ1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjMiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDU2NjM0NjIsImV4cCI6MTc0NTc0OTg2Mn0.TiPWNrdBgyabYr1a14zPVJRKQUw4kjL6vqzl6yiqd14`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;