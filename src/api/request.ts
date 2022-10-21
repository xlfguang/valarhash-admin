import { getToken,setToken } from '@/utils/auth'
import axios from 'axios'

const BASE_URL = 'https://api.valarhashjp.com/'
const LOC_URL = 'http://192.168.1.191:3000/'

type RequestConfig = {
  method?: 'get' | 'post' | 'put' | 'delete'
  hint?: boolean
}
export type ResponseFun<T> = (url: string, data?: any, config?: RequestConfig) => Promise<T>

export type Response = {
  config?: any
  data: any
  headers?: any
  request?: any
  status: number
  statusText?: string
}
export type ErrorResponse = {
  code?: string
  config?: any
  message?: string
  name?: string
  request?: any
  response: Response
}

/** 默认请求头 */
const REQUEST_HEADER = {
  'Content-Type': 'application/json',
  Accept: '*/*'
}
/**带token请求头 */
const setTokenToHeader = () => ({
  ...REQUEST_HEADER,
  Authorization: getToken()
})
const request: ResponseFun<any> = (
  url,
  data = {},
  config = {
    method: 'get',
    hint: true
  }
) => {
  url = BASE_URL + url
  const headers = url == 'common/login' ? REQUEST_HEADER : setTokenToHeader()
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: config.method || 'post',
      data,
      headers: headers
    })
      .then((res: Response) => {
        if (res.status !== 200) {
          reject(res.data)
        } else {
          resolve(res.data)
          if(url == 'https://api.valarhashjp.com/common/login' ){
            const token = `Bearer ${res.headers.authorization}`;
            setToken(token)
          }
        }
      })
      .catch((err: ErrorResponse) => {
        reject(err.response.data)
      })
  })
}
export default request
