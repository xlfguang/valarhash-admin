import request from './request';
const GET_BANNER_LIST_URL = 'admin/banner/list';
export const GET_BANNER_LIST_RUL_API = (param) => request(`${GET_BANNER_LIST_URL}?pageNum=${param.pageNum}&pageSize=${param.pageSize}`, {}, { method: 'get' });
const SEVA_BANNER_INFO_URL = 'admin/banner/save';
export const SEVA_BANNER_INFOL_API = (id, param) => request(`${SEVA_BANNER_INFO_URL}/${id}`, param, { method: 'post' });
const ADD_BANNER_URL = 'admin/banner';
export const ADD_BANNER_API = (param) => request(`${ADD_BANNER_URL}`, param, { method: 'post' });
export const REMOVE_BANNER_API = (ID) => request(`${ADD_BANNER_URL}/${ID}`, {}, { method: 'delete' });
//# sourceMappingURL=banner.js.map