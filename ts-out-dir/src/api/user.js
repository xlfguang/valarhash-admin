import request from '@/utils/axiosReq';
import myRquest from './request';
export function loginReq(data) {
    return myRquest('common/login', data, {
        method: 'post',
        hint: false
    });
}
export function getInfoReq() {
    return request({
        url: '/integration-front/user/getUserInfo',
        bfLoading: false,
        method: 'post',
        isAlertErrorMsg: false
    });
}
export function logoutReq() {
    return request({
        url: '/integration-front/user/loginOut',
        method: 'post'
    });
}
//# sourceMappingURL=user.js.map