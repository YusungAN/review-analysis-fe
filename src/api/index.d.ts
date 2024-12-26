import { AxiosRequestConfig } from 'axios';
import { APIResponse } from '../model/commonResponse';
export declare const getData: <T>(url: string, config?: AxiosRequestConfig) => Promise<APIResponse<T>>;
export declare const postData: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<APIResponse<T>>;
