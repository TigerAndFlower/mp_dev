import requests from '@/api/request'
// 提交产品信息
export function test (data) {
  return requests({
    url: '/test/test',
    method: 'post',
    data
  })
}
