import requests from '@/api/request'
// 直播列表
export function findLiveRoomListByid (data) {
  return requests({
    url: '/room/findLiveRoomListByid',
    method: 'get',
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
