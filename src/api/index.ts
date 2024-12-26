import axios, { Axios, AxiosRequestConfig } from 'axios';
import { APIResponse } from '../model/commonResponse';

const client: Axios = axios.create({
    baseURL: 'https://review-analysis-back-polished-star-6700.fly.dev',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.get<APIResponse<T>>(url, config);
        return response.data;
    } catch (error) {
        throw new Error((error as {message: string}).message);
    }
};


export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.post<APIResponse<T>>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error((error as {message: string}).message);
    }
};