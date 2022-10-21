declare type RequestConfig = {
    method?: 'get' | 'post' | 'put' | 'delete';
    hint?: boolean;
};
export declare type ResponseFun<T> = (url: string, data?: any, config?: RequestConfig) => Promise<T>;
export declare type Response = {
    config?: any;
    data: any;
    headers?: any;
    request?: any;
    status: number;
    statusText?: string;
};
export declare type ErrorResponse = {
    code?: string;
    config?: any;
    message?: string;
    name?: string;
    request?: any;
    response: Response;
};
declare const request: ResponseFun<any>;
export default request;
