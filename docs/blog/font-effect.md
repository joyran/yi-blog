---
title: 一些好玩的字体特效
date: 2020-12-03
---

众所周知，字体给定一个 `color` 就能显示你设置的颜色了，应付绝大多数设计是足够了，
如果设计师要求字体背景是渐变色或者是一个图片该怎么办，不慌我们来一一实现。

### 背景为渐变

这个效果需要用到两个 CSS3 特性 [`background-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
和 [`-webkit-text-fill-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-text-fill-color)，
当然了前提是给文字设置一个渐变背景。兼容性嘛查了下除了 IE 现代浏览器都支持了，算是可以放心的使用把。

```css
{
  background: linear-gradient(94.23deg,#5374fa 12.41%,#fd9179 52.55%,#ff6969 89.95%);
  background-clip: text; /* 将背景色裁剪为字体背景 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* 字体颜色透明，这样就能使用背景图片了 */
}
```

<FontEffect-Demo1 />

<!-- more -->

### 背景为图片

只要把 `background-image` 设置为你想要的图片即可，别忘了设置图片大小，不然就达不到你想要的效果了。

```css
{
  background-image: url('https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?cs=srgb&dl=pexels-emiliano-arano-1295138.jpg&fm=jpg');
  background-position: center;
  background-size: cover;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

<FontEffect-Demo2 />

来点特殊的，把背景图片设置为 gif，是不是看起来就更酷炫一点了。

<FontEffect-Demo3 />

### 文字渐显

下面来做一个文字随着滚动条滚动显现的效果，原理是文字首先设置一个线性渐变背景。
该渐变有两种颜色，左边是黑色，右边是白色，初始状态下黑色百分比为 -100%，白色百分比为 0%，
这样整个渐变都是白色了，达到了文字隐藏的效果。然后监听滚动事件，随着滚动慢慢的将黑色和白色的百分比都增大，
这样黑色背景就慢慢的显示出来了，此时文字也就慢慢的出现了，来看看下面的效果。

<FontEffect-Demo4 />

附上文字渐显全套代码

```vue
<template>
  <div class="font-effect__wrap">
    <p class="font-effect__text" ref="text">HELLO WORLD</p>
  </div>
</template>

<script>
export default {
  mounted () {
    window.addEventListener('scroll', this.handleOnScroll)
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleOnScroll)
  },

  methods: {
    handleOnScroll () {
      // 网页高度
      const clientHeight = document.documentElement.clientHeight
      // 字体底部距离浏览器顶部的距离
      const bottom = this.$refs.text.getBoundingClientRect().bottom
      // 当网页高度大于字体底部距离浏览器顶部的距离时表明字体进入可视范围了，加个 100 用作缓存
      if (bottom < clientHeight - 100) {
        const progress = (clientHeight - bottom) * 100 * 2.5 / clientHeight
        const progress1 = -100 + progress
        this.$refs.text.style.setProperty('--gradient-progress-1', `${progress1}%`)
        this.$refs.text.style.setProperty('--gradient-progress-2', `${progress}%`)
      } else {
        this.$refs.text.style.setProperty('--gradient-progress-1', '-100%')
        this.$refs.text.style.setProperty('--gradient-progress-2', '0%')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.font-effect__wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.font-effect__text {
  --gradient-progress-1: -100%;
  --gradient-progress-2: 0%;
  font-size: 80px;
  font-weight: bold;
  background-image: linear-gradient(135deg, #000 var(--gradient-progress-1), #fff var(--gradient-progress-2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 400px;
}
</style>
```
