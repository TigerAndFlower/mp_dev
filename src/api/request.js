import axios from 'axios'
import Qs from 'qs'
// form Data格式
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? document.location.protocol + '/api' // 测试环境
    : document.location.protocol + '//mp.ofweek.com' // 现网环境
const requests = axios.create({
  baseURL: baseUrl, // url = base url + request url
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return Qs.stringify(data)
  }]
})
// 添加请求拦截器
requests.interceptors.request.use(
  config => {
    config.headers['devType'] = '4'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
requests.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default requests
