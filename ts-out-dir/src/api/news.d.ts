export interface newsItem {
    id: number;
    content: string;
    title: string;
    overview: string;
    figure: string;
}
declare type T_GET_NEWS_LIST_API = (param: {
    pageSize: number;
    pageNum: number;
}) => Promise<{
    data: {
        count: number;
        results: Array<newsItem>;
    };
}>;
declare type T_GET_NEWS_INFO_API = (id: number) => Promise<{
    data: newsItem;
}>;
declare type T_SEVA_NEWS_INFOL_API = (id: number, info: {
    content: string;
    title: string;
    overview: string;
    figure: string;
}) => Promise<{
    data: any;
}>;
declare type T_ADD_NEWS_API = (param: {
    content: string;
    title: string;
    overview: string;
    figure: string;
}) => Promise<{
    data: any;
}>;
export declare const GET_NEWS_LIST_API: T_GET_NEWS_LIST_API;
export declare const GET_NEWS_INFO_API: T_GET_NEWS_INFO_API;
export declare const SEVA_NEWS_INFOL_API: T_SEVA_NEWS_INFOL_API;
export declare const ADD_NEWS_API: T_ADD_NEWS_API;
export {};
