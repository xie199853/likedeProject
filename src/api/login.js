import request from '@/utils/request'
/**
 * 登录接口
 * @param {*} data 用户登录信息
 * @returns
 */
export function loginAPI(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}

/**
 * 获取验证码接口
 * @returns
 */
export const VerificationCodeAPI = (num) => {
  return request({
    url: `/user-service/user/imageCode/${num}`,
    responseType: 'blob'
  })
}
