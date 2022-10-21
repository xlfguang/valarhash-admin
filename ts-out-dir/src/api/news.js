import request from './request';
const GET_NEWS_LIST_URL = 'common/news/list';
export const GET_NEWS_LIST_API = (param) => request(`${GET_NEWS_LIST_URL}?pageNum=${param.pageNum}&pageSize=${param.pageSize}`, {}, { method: 'get' });
const GET_NEWS_INFO_URL = 'common/news';
export const GET_NEWS_INFO_API = (id) => request(`${GET_NEWS_INFO_URL}/${id}`, {}, { method: 'get' });
const SEVA_NEWS_INFO_URL = 'admin/news/save';
export const SEVA_NEWS_INFOL_API = (id, param) => request(`${SEVA_NEWS_INFO_URL}/${id}`, param, { method: 'post' });
const ADD_NEWS_URL = 'admin/news';
export const ADD_NEWS_API = (param) => request(`${ADD_NEWS_URL}`, param, { method: 'post' });
//# sourceMappingURL=news.js.map