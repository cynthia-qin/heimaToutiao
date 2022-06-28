import request from '@/utils/request'
import store from '@/store'

// 发送短信验证码请求
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

// 登录
export const login = (data) => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}
// 获取用户个人资料
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
