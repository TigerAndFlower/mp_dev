import obj from '@/api/request'
let requests = obj.requests
let requestsLive = obj.requestsLive
let requestswenku = obj.requestswenku

// 文库
export function documentList (params) {
  return requestswenku({
    url: '/api/ofweek_mp.php',
    method: 'get',
    params
  })
}
// 产品列表
export function getProductList (params) {
  return requestsLive({
    url: '/api/admin/speakerproduct/getProductList',
    method: 'get',
    params
  })
}
// 直播
export function findLiveRoomListByid (params) {
  return requestsLive({
    url: '/api/admin/speakerproduct/getRoomList',
    method: 'get',
    params
  })
}

// 视频列表
export function getPageVideoList (data) {
  return requests({
    url: '/Homepage/getPageVideoList',
    method: 'post',
    data
  })
}
// 文章列表
export function getPageNewsList (data) {
  return requests({
    url: '/Homepage/getPageNewsList',
    method: 'post',
    data
  })
}
// 提交编辑页面
export function saveHomePage (data) {
  return requests({
    url: '/Homepage/saveHomePage',
    method: 'post',
    data
  })
}
// 获取编辑数据
export function getHomePage (params) {
  return requests({
    url: '/Homepage/getHomePage',
    method: 'get',
    params
  })
}
// 上传图片
export function upload (data) {
  return requests({
    url: '/Homepage/upload',
    method: 'post',
    data
  })
}
