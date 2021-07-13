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
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return r[2]
  } else {
    return null
  }
}
