import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
// import router from '../router'

let ax = axios.create({
  baseURL: process.env.BASE_PATH,
  withCredentials: true
})

// 添加响应拦截器
ax.interceptors.response.use(res => {
  // 如果接口返回NOT_LOGGEDIN就跳转到登录
  if (res.data.resultCode === 'NOT_LOGGEDIN') {
    store.commit('CLEAR_USER')
    window.location.href = '/#/login'
  }
  return res
})

export default {
  get: (url, params) => {
    return ax({
      method: 'get',
      url: url,
      params: qs.stringify(params)
    })
  },
  post: (url, params) => {
    return ax({
      method: 'post',
      url: url,
      data: qs.stringify(params)
    })
  }
}
