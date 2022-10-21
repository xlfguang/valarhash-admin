export interface bannerItem {
    id: number;
    url: string;
    title: string;
}
declare type T_GET_BANNER_LIST_RUL_API = (param: {
    pageSize: number;
    pageNum: number;
}) => Promise<{
    data: {
        count: number;
        results: Array<bannerItem>;
    };
}>;
declare type T_SEVA_BANNER_INFOL_API = (id: number, info: {
    url: string;
    title: string;
}) => Promise<{
    data: any;
}>;
declare type T_ADD_BANNER_API = (param: {
    url: string;
    title: string;
}) => Promise<{
    data: any;
}>;
export declare const GET_BANNER_LIST_RUL_API: T_GET_BANNER_LIST_RUL_API;
export declare const SEVA_BANNER_INFOL_API: T_SEVA_BANNER_INFOL_API;
export declare const ADD_BANNER_API: T_ADD_BANNER_API;
export {};
