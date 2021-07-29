import axios from 'axios'
import Qs from 'qs'
// form Data格式
// 维科号 请求
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? '/api' // 测试环境
    : '//mp.ofweek.com' // 现网环境/Api/getHomePage
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
// live 请求
const liveUrl =
  process.env.NODE_ENV === 'development'
    ? '/live' // 本地环境
    : '//livetest.ofweek.com' // 现网环境  https://live.ofweek.com
const requestsLive = axios.create({
  baseURL: liveUrl, // url = base url + request url
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
// 添加请求拦截器
requestsLive.interceptors.request.use(
  config => {
    config.headers['devType'] = '4'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
requestsLive.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)
const wenkuUrl =
  process.env.NODE_ENV === 'development'
    ? '/wenku' // 测试环境
    : '//wenku.ofweek.com' // 现网环境
const requestswenku = axios.create({
  baseURL: wenkuUrl, // url = base url + request url
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
// 添加请求拦截器
// requestswenku.interceptors.request.use(
//   config => {
//     config.headers['devType'] = '4'
//     console.log('添加请求拦截器')
//     return config
//   },
//   error => {
//     console.log(1111111)
//     return Promise.reject(error)
//   }
// )

// response interceptor
requestswenku.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)
let obj = {
  requests: requests,
  requestsLive: requestsLive,
  requestswenku: requestswenku
}
export default obj
