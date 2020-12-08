---
title: 自定义事件总线
date: 2020-12-08
---

Vue 开发中经常会碰到组件间通信，包括父子组件、兄弟组件、孙子组件等。父子组件一般情况下通过 `props` 和 `emit` 就能解决。
兄弟组件和其他非父子组件一般会用 `Vuex` 或者全局事件总线实现。

Vue 全局事件总线使用起来特别简单，在 main.js 中注册一个全局总线，
然后在想要执行事件的地方注册事件 `$on`，在你想要的地方触发事件 `$emit`。

```js
/* 新建一个 Vue 实例作为中央事件总线 */
Vue.event = Vue.prototype.$event = new Vue()

/* 监听事件 */
this.$event.$on('eventName', (arg) => {
  console.log(arg)
})

/* 触发事件 */
this.$event.$emit('eventName', 'this is a message')
```

<!-- more -->

了解了 Vue 自带的事件总线后，接下来试着自己写一套事件总线，实现下面4个小功能

- 事件注册 on
- 事件触发 emit
- 事件销毁 off
- 事件单次注册 once

### 事件总线

既然是事件总线，那是不是得有一个总线来存储所有事件呢，定义这个总线名为 `events`，每一个事件是总线 `events` 的一个 `key`，
监听的函数作为 `key` 的值。

```js
// 这是一个事件总线例子
const events = {
  eventName: function () {
    console.log('eventName')
  }
}
```

这种方案一个事件名称只能监听一个函数，想要监听多个函数需要把 `key` 的值改为数组。

```js
const events = {
  eventName: [
    {
      handler: function () {
        console.log('eventName1')
      }
    },
    {
      handler: function () {
        console.log('eventName2')
      }
    }
  ]
}
```

### 事件注册

这样一来事件注册其实就是往事件总线 `events` 中添加一个 eventName 字段。

```js
on (eventName, callback) {
  // 未注册过新建一个空队列用于保存要注册的函数
  if (!this.events[eventName]) {
    this.events[eventName] = []
  }

  this.events[eventName].push({
    handler: callback
  })
}
```

新建一个 event.js 文件，用 `class` 写法重新组织下。

```js
// event.js
export default class Event {
  constructor () {
    this.events = {}
  }

  on (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }

    this.events[eventName].push({
      handler: callback
    })
  }
}
```

### 事件触发

事件注册完成后怎么触发呢，遍历数组挨个的调用函数即可。

```js
emit (eventName, ...args) {
  if (!this.events[eventName]) return
  this.events[eventName].forEach(item => {
    item.handler(...args)
  })
}
```

### 事件销毁

事件销毁其实就是在总线 `events` 中删除对应的事件，如果不传参则删除所有事件。

```js
off (eventName) {
  if (eventName) {
    delete this.events[eventName]
  } else {
    this.events = {}
  }
}
```

### 事件单次注册

单次注册事件其实就是给改事件加一个 `once` 标志，在 `emit` 触发后删除即可，那样后续无论怎么 `emit` 都触发不到了。

```js
once (eventName, callback) {
  if (!this.events[eventName]) {
    this.events[eventName] = []
  }

  this.events[eventName].push({
    handler: callback,
    once: true
  })
}

emit (eventName, ...args) {
  if (!this.events[eventName]) return
  this.events[eventName].forEach((item, index) => {
    item.handler(...args)
    if (item.once) {
      this.events[eventName].splice(index, 1)
    }
  })
}
```

### 使用方法

事件总线写好了怎么用呢？和 Vue 自带的事件总线几乎一模一样。[event.js](https://github.com/joyran/yi-blog/blob/master/docs/.vuepress/event.js)

```js
import Event from './event'
Vue.prototype.$event = new Event()

/* 监听事件 */
this.$event.on('eventName', (arg) => {
  console.log(arg)
})

/* 触发事件 */
this.$event.emit('eventName', 'this is a message')
```

那在 Vuepress 中怎么引用呢？新建一个 `docs\.vuepress\enhanceApp.js` 文件然后复制下面代码。

```js
import Event from './event'
export default ({ Vue, options, router, siteData }) => {
  Vue.prototype.$event = new Event()
}
```

下面是用自定义的事件总线实现的一个例子，上下两个组件是兄弟组件，在下面输入框中输入内容点击发送按钮，
消息内容就会跑到上面了。

<Event-Demo1 />
<Event-Demo2 />
