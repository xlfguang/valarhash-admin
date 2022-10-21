import request from './request'
export interface newsItem {
  id: number
  content: string
  title: string
  overview: string
  figure: string
}
type T_GET_NEWS_LIST_API = (param: {
  pageSize: number
  pageNum: number
}) => Promise<{
  data: {
    count: number
    results: Array<newsItem>
  }
}>
type T_GET_NEWS_INFO_API = (id:number) => Promise<{
    data: newsItem
  }>

type T_SEVA_NEWS_INFOL_API = (
  id: number,
  info: { content: string; title: string; overview: string; figure: string }
) => Promise<{
  data: any
}>

type T_ADD_NEWS_API = (param: {
    content: string
    title: string
    overview: string
    figure: string
}) => Promise<{
  data: any
}>

const GET_NEWS_LIST_URL = 'common/news/list'
export const GET_NEWS_LIST_API: T_GET_NEWS_LIST_API = (param) =>
  request(`${GET_NEWS_LIST_URL}?pageNum=${param.pageNum}&pageSize=${param.pageSize}`, {}, { method: 'get' })

const GET_NEWS_INFO_URL = 'common/news'
export const GET_NEWS_INFO_API: T_GET_NEWS_INFO_API = (id) =>
  request(`${GET_NEWS_INFO_URL}/${id}`, {}, { method: 'get' })

const SEVA_NEWS_INFO_URL = 'admin/news/save'
export const SEVA_NEWS_INFOL_API: T_SEVA_NEWS_INFOL_API = (id, param) =>
  request(`${SEVA_NEWS_INFO_URL}/${id}`, param, { method: 'post' })

const ADD_NEWS_URL = 'admin/news'
export const ADD_NEWS_API: T_ADD_NEWS_API = (param) => request(`${ADD_NEWS_URL}`, param, { method: 'post' })

export const REMOVE_NEWS_API = (ID:string) => request(`${ADD_NEWS_URL}/${ID}`,{},{method:'delete'})
