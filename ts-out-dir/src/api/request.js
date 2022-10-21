import { getToken, setToken } from '@/utils/auth';
import axios from 'axios';
const BASE_URL = 'https://api.valarhashjp.com/';
const LOC_URL = 'http://192.168.1.191:3000/';
const REQUEST_HEADER = {
    'Content-Type': 'application/json',
    Accept: '*/*'
};
const setTokenToHeader = () => ({
    ...REQUEST_HEADER,
    Authorization: getToken()
});
const request = (url, data = {}, config = {
    method: 'get',
    hint: true
}) => {
    url = BASE_URL + url;
    const headers = url == 'common/login' ? REQUEST_HEADER : setTokenToHeader();
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: config.method || 'post',
            data,
            headers: headers
        })
            .then((res) => {
            if (res.status !== 200) {
                reject(res.data);
            }
            else {
                resolve(res.data);
                if (url == 'https://api.valarhashjp.com/common/login') {
                    const token = `Bearer ${res.headers.authorization}`;
                    setToken(token);
                }
            }
        })
            .catch((err) => {
            reject(err.response.data);
        });
    });
};
export default request;
//# sourceMappingURL=request.js.map