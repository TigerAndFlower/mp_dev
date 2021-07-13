import requests from '@/api/request'
// 文章最多 1151

// 视频最多 864
// 直播列表
export function getPageLiveRoomsList (data) {
  return requests({
    url: '/Homepage/getPageLiveRoomsList',
    method: 'post',
    data
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
