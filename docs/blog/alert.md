---
title: 自定义 Alert + Confirm
date: 2020-11-18
---

中后台开发中经常要用到告警和弹框确认功能，分别对应原生的 `alert` 和 `confirm` 方法，就是这样式不敢恭维，只能自己实现一套了。
<button onclick="javascript:alert('操作失败!')">Alert</button>
<button onclick="javascript:confirm('确认删除吗？删除后无法恢复!')">Confirm</button>

实现很简单，新建一个 `alert` 组件，然后在需要的地方 `import`, 然后设置 `visible = true` 即可，但这样太麻烦了，能不能像原生js那样直接使用 `alert` 方法呢，下面就来尝试下。

<!-- more -->

不管通过哪种方式，alert 组件必不可少，不过和普通组件不一样，配置项不能通过 props 传递，而是要放在 data 里。

```vue
<!-- alert.vue -->
<template>
  <div v-show="visible">
    <div class="alert">
      <p class="alert-message">{{ message }}</p>
      <button class="alert-button" @click="handleClose">确定</button>
    </div>
    <div class="alert-mask" @click.self="handleClose"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      message: ''
    }
  },

  methods: {
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.alert {
  position: absolute;
  width: 320px;
  left: 50%;
  transform: translate(-50%, 0);
  top: 20%;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  z-index: 1001;
}

.alert-message {
  font-size: 14px;
  line-height: 22px;
  color: #333;
  margin-bottom: 32px;
}

.alert-button {
  min-width: 80px;
  padding: 8px 24px;
  text-align: center;
  background: #0075de;
  border: 0;
  outline: 0;
  float: right;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.alert-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  z-index: 1000;
}
</style>
```

接下来注册一个 `$alert` 方法，调用该方法时加载 alert 组件并添加到 body 上。

```js
// alert.js
import Vue from 'vue'
import Index from './alert.vue'
const IndexConstructor = Vue.extend(Index)

const Alert = function (options) {
  options = options || {} // 获取参数

  // 基于我们写好的 alert 组件实例化一个新的 alert 实例
  const instance = new IndexConstructor({
    data: options // 这里解释了为什么参数不用 props 而用 data
  })
  instance.$mount() // 加载实例，不能加参数，如果加了 body 参数会把整个 body 覆盖重写
  document.body.appendChild(instance.$el) // 将上一步加载的实例添加到 body 上
  instance.visible = true // 设置 data 里的 visible 为 true 显示弹框
  return instance
}

Vue.prototype.$alert = Alert // alert 绑定到 vue 上方便调用
```

此时在组件中可以愉快的调用了

```js
this.$alert({ message: 'hello world' })
```

接下来实现关闭功能，当点击确定按钮或者蒙版时关闭弹框，这个也简单，只需要绑定事件并设置 `visible = false` 即可，最后记得在关闭事件中销毁组件。

```js {6-7}
methods: {
  handleClose () {
    this.visible = false
    // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
    // https://cn.vuejs.org/v2/api/#vm-destroy
    this.$destroy(true)
    this.$el.parentNode.removeChild(this.$el) // 从父元素上移除当前组件 dom
  }
}
```

### 监听关闭事件

上一步实现了关闭功能，如果用户想在调用的时候监听关闭事件，该怎么处理？先仿照其他组件写一个示例。

```js
this.$alert({
  message: 'hello world',
  onClose: function () {
    console.log('closed')
  }
})
```

onClose 也是 options 的一个字段，通过 data 传递给 alert 组件了，在 alert 组件里加一个 onClose 变量接收这个方法，然后在 handleClose 中调用 onClose 方法，此时外部传入进来的 onClose 方法就被调用了。

```js {6,15}
export default {
  data () {
    return {
      visible: false,
      message: '',
      onClose: null
    }
  },

  methods: {
    handleClose () {
      this.visible = false
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
      this.onClose()
    }
  }
}
```

### 效果演示

目前这个组件还是很粗糙的，没有动画，配置也不够灵活，不过既然我们知道了方法，这些以后都可以慢慢加。

<AlertDemo />

可能有的同学会好奇了，怎么在 vuepress 里注册 $alert 方法呢，答案是用神奇的 enhanceApp.js。

```js
// docs\.vuepress\enhanceApp.js
import Alert from './alert.js'

export default ({ Vue, options, router, siteData }) => {
  Vue.prototype.$alert = Alert
}
```

上面代码演示按钮用到了 ElementUI，在 vuepress 中引入 ElementUI 也是通过 enhanceApp.js。

```js {2,3,6}
import Alert from './alert'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(ElementUI)
  Vue.prototype.$alert = Alert
}
```

本以为可以开心的用 element ui 了，结果控制台报错 `Cannot find module 'core-js/library/xxx'`，这是因为 vuepress 和 element ui 依赖的 core-js 版本不一致导致的，用这条命令可以解决该问题 `yarn add async-validator@1.11.5`, [issue](https://github.com/vuejs/vuepress/issues/2275#issuecomment-693347859)

### 封装成独立组件

目前这个 `alert` 组件还只能在当前项目中使用，接下来稍微封装下发布到 npm 仓库供所有人使用，把 alert.js 最后一行 `Vue.prototype.$alert = Alert` 替换为 `export default Alert`，改由外部注册

```js
// index.js
import Alert from './alert.js'

const install = function (Vue, opts = {}) {
  Vue.prototype.$alert = Alert
}

export default { install }
```

在 package.json scripts 添加一条命令，

```shell
"build": "vue-cli-service build --target lib --name alert ./index.js",
```

`npm run build` 后执行 `npm publish` 上传到 npm 仓库，此时别人下载下来后就可以愉快的使用了。

```js
import Vue from 'vue'
import alert from 'alert'
Vue.use(alert)

this.$alert({
  message: 'hello world',
  onClose: function () {
    console.log('closed')
  }
})
```
