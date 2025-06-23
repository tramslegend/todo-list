// api/ApiManager.ts
import axios, { AxiosInstance } from 'axios';

const ApiManager: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    withCredentials: true,
    headers: {
    },
});

export default ApiManager;
