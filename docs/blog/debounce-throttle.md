---
title: 防抖和节流
date: 2021-01-09
---

### 防抖

当事件触发时，一定时间段 t 内没有再次触发事件，事件处理函数才会执行，如果在时间段 t 内，又触发了一次函数，就重新开始延时。

场景：窗口 resize 过程中不立即执行重绘函数，而是等到窗口不在 resize 时才执行重绘函数。或者输入框连续输入时不立即执行搜索请求，而是等用户不在输入后过 500ms 才执行搜索。

<!-- more -->

延迟执行函数要用到 `setTimeout`，将想要延迟执行的函数放到 `setTimeout` 中，如果在给定延迟时间内又触发了一次则清空上一个 `setTimeout` 函数重新开始计时。

```js
function debounce (fn, delay = 500) {
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
```

<DebounceDemo />

vue 中一个简单例子，监听窗口 resize 事件并打印窗口大小，试着缩放当前窗口在控制台看看效果。

```js
export default {
  mounted () {
    window.addEventListener('resize', this.debounce(this.print, 1000))
  },

  methods: {
    print () {
      const width = window.innerWidth
      const height = window.innerHeight
      console.log('防抖：', width, height)
    }
  }
}
```

::: warning
`debounce` 函数第一个参数必须是函数名，不能加括号，加了括号函数会立即执行。
不加括号的话那该怎么给被执行函数传参呢？答案是把 `debounce(print)` 赋值给另外一个函数 debouncePrint。
给函数 `debouncePrint` 传参，比如 `debouncePrint('a', 'b')`
:::

下面是一个函数传参的例子。

```js
export default {
  mounted () {
    const debouncePrint = this.debounce(this.print, 1000)
    window.addEventListener('resize', () => {
      const width = window.innerWidth
      const height = window.innerHeight
      debouncePrint(width, height)
    })
  },

  methods: {
    print (width, height) {
      console.log('防抖：', width, height)
    }
  }
}
```

### 节流

节流是指当持续触发事件时，保证一定时间段t内只调用一次事件处理函数。

```js
throttle (fn, delay = 500) {
  if (typeof fn !== 'function') {
    throw new TypeError('第一个参数必须为函数')
  }

  let flag = false
  return function (...args) {
    if (flag) return
    flag = true

    setTimeout(function () {
      fn.call(this, ...args)
      flag = false
    }, delay)
  }
}
```

代码解析：用一个 flag 变量记录状态，flag 初始值为 false 表示没有在运行的函数，此时可以运行函数，
运行函数前把 flag 置为 true 表示已经有正在运行的函数了，接下来的函数我都不处理了。
函数放到 `setTimeout` 中执行，在给定延迟时间到达后会执行函数并将 flag 置为 false 表示我用完了，
下一个函数可以继续运行了。如果在给定延迟时间到达之前又执行函数会因为 flag 为 true 而拒绝执行。

以窗口滚动事件为例，要求每隔 1000 毫秒打印一次 scrollTop，试试打开控制台频繁的滚动窗口看看效果。

```js
export default {
  mounted () {
    window.addEventListener('scroll', this.throttle(this.printScrollTop, 1000))
  },

  methods: {
    printScrollTop () {
      const time = parseInt(new Date().getTime() / 1000)
      console.log('节流：', time, document.documentElement.scrollTop)
    }
  }
}
```

最后要记得在 destroyed 生命周期中销毁监听事件，否则在其他页面也会执行监听函数。

```js
window.removeEventListener('resize', this.debounce(this.print, 1000))
```

很不幸上面的代码不管用，因为 `removeEventListener` 第二个参数函数名必须和 `addEventListener` 绑定的函数名一样，
不能用匿名函数，可以把 `this.debounce(this.print, 1000)` 赋值给一个变量 `this.onResize` 即可，像下面这样。

```js
export default {
  data () {
    return {
      onResize: this.debounce(this.print, 1000),
      onScroll: this.throttle(this.printScrollTop, 1000)
    }
  },

  mounted () {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
  },

  destroyed () {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onScroll)
  }
}
```

