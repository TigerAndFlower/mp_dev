// 深拷贝方法
export function deepClone (obj) {
  var objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}
/*
 * 获取url中指定参数的值
 * @param {String} name 指定参数
 * @return {String | Object}
*/
export function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let str = window.location.href
  var index = str.lastIndexOf('?')
  str = str.substring(index + 1, str.length)
  var r = str.match(reg)
  if (r != null) {
    return r[2]
  } else {
    return null
  }
}

export function formatDate (value, format) {
  value = typeof value === 'string' ? value.replace(/-/g, '/') : value
  const d = new Date(value)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  let hour = d.getHours()
  let minutes = d.getMinutes()
  let resultStr = 'YYYY-MM-DD hh:mm'

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minutes = minutes < 10 ? '0' + minutes : minutes

  resultStr = resultStr.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hour)
    .replace('mm', minutes)
  return resultStr
}
export function getID (name) {
  if (name === 'id') {
    return getQueryString('id') ? getQueryString('id') : 864
  } else if (name === 'account') {
    return getQueryString('account') ? getQueryString('account') : 'P14cd2a1d17fc7d011d67809d4c756153'
  } else if (name === 'username') {
    return getQueryString('username') ? getQueryString('username') : 'Pa8db91c3faca302fcd9d854891542cf9'
  }
}
