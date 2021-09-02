export function throttle (fn, delay = 500) {
  if (typeof fn !== 'function') {
    throw new TypeError('第一个参数必须为函数')
  }

  let flag = false
  return function (...args) {
    if (flag) return
    flag = true

    setTimeout(() => {
      fn.call(this, ...args)
      flag = false
    }, delay)
  }
}

export function debounce (fn, delay = 500) {
  if (typeof fn !== 'function') {
    throw new TypeError('第一个参数必须为函数')
  }
  
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}