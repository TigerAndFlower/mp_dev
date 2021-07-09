import axios from 'axios'
// form Data格式
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? document.location.protocol + '//localhost:8081/api' // 测试环境
    : document.location.protocol + '//mp.ofweek.com/api' // 现网环境
const requests = axios.create({
  baseURL: baseUrl, // url = base url + request url
  timeout: 180000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  withCredentials: true
})
// 添加请求拦截器
requests.interceptors.request.use(
  config => {
    config.headers['devType'] = '4'
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    // console.log(error); // for debug
    return Promise.reject(error)
  }
)

// response interceptor
requests.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
  },
  error => {
    // console.log("err" + error); // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default requests
