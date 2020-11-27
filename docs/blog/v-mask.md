---
title: 遮罩蒙版 v-mask
date: 2020-11-17
---

业务开发中会遇到这样需求，某个功能或者页面在特定版本下加一个遮罩层，遮罩层上提示用户去付费购买。

![效果图](https://img-cdn.wezhuiyi.com/yi-blog/Snipaste_2020-11-17_18-11-33.jpg)

这个需求很简单，开发一个遮罩层蒙版组件，遮罩层用绝对定位铺满父元素，里面内容居中布局。父元素设置相对定位即可。

<!-- more -->

**FuzzyMask.vue**

```html
<template>
  <div class="fuzzy-mask">
    <p>当前套餐不支持此功能，您可以联系客服</p>
  </div>
</template>

<style lang="scss">
.fuzzy-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

**父元素**

```html
<template>
  <div class="parent">
    <p>父元素</p>
    <FuzzyMask />
  </div>
</template>

<script>
import FuzzyMask from './FuzzyMask'

export default {
  components: { FuzzyMask }
}
</script>

<style lang="scss">
.parent {
  position: relative;
  height: 300px;
  border: 1px solid #0075DE;
  padding: 24px;
}
</style>
```

效果图如下

<div class="parent">
  <p>父元素</p>
  <FuzzyMask />
</div>

<style>
.parent {
  position: relative;
  height: 300px;
  border: 1px solid #0075DE;
  padding: 24px;
}
</style>

一个页面还好，如果有N多个页面都需要这个功能，那么就有点麻烦了，毕竟还要 import 组件，注册组件，如果能用指令 `v-mask` 实现就好了，原理很简单，看完 vue.js [官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html) 就可以写出来了。


```js
import Vue from 'vue'
import FuzzyMask from './FuzzyMask'
const Mask = Vue.extend(FuzzyMask)

Vue.directive('mask', {
  bind: function (el, binding) {
    const mask = new Mask({
      el: document.createElement('div')
    })

    el.style.position = 'relative'
    binding.value && el.appendChild(mask.$el)
  }
})
```

此时在父元素上加 `v-mask` 即可显示遮罩层

```html
<div v-mask>
  <p>父元素</p>
</div>
```

对 FuzzyMask 稍微改造下，可以接受外部参数 mask-text

```html
<!-- FuzzyMask.vue -->
<template>
  <div class="fuzzy-mask">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: null
    }
  }
}
</script>
```

```js
Vue.directive('mask', {
  bind: function (el, binding) {
    const text = el.getAttribute('mask-text') || '当前套餐不支持此功能，您可以联系客服'

    const mask = new Mask({
      el: document.createElement('div'),
      data: {
        text: text
      }
    })

    el.style.position = 'relative'
    binding.value && el.appendChild(mask.$el)
  }
})
```

使用的时候

```html
<div v-mask mask-text="你好啊">
  <p>父元素</p>
</div>
```
