import request from '@/utils/request'

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
