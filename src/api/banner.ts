import request from './request'
export interface bannerItem {
  id: number
  url: string
  title: string
}
type T_GET_BANNER_LIST_RUL_API = (param: {
  pageSize: number
  pageNum: number
}) => Promise<{
  data: {
    count: number
    results: Array<bannerItem>
  }
}>

type T_SEVA_BANNER_INFOL_API = (
  id: number,
  info: { url: string; title: string }
) => Promise<{
  data: any
}>

type T_ADD_BANNER_API = (param: {
  url: string
  title: string
}) => Promise<{
  data: any
}>

const GET_BANNER_LIST_URL = 'admin/banner/list'
export const GET_BANNER_LIST_RUL_API: T_GET_BANNER_LIST_RUL_API = (param) =>
  request(`${GET_BANNER_LIST_URL}?pageNum=${param.pageNum}&pageSize=${param.pageSize}`, {}, { method: 'get' })

const SEVA_BANNER_INFO_URL = 'admin/banner/save'
export const SEVA_BANNER_INFOL_API: T_SEVA_BANNER_INFOL_API = (id, param) =>
  request(`${SEVA_BANNER_INFO_URL}/${id}`, param, { method: 'post' })

const ADD_BANNER_URL = 'admin/banner'
export const ADD_BANNER_API: T_ADD_BANNER_API = (param) => request(`${ADD_BANNER_URL}`, param, { method: 'post' })
