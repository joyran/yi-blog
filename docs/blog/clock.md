---
title: Vue 仿华为 EMUI 系统桌面时钟
date: 2019-10-30
---

拖了好久，我的个人网站算是正式对外营业了🎉🎉🎉。用了当下最火的 VuePress 框架，
当然首页和文章页我都重写了，使其更像个人博客，而非技术文档。

言归正传，最近闲来无聊想写一个时钟练练手，自己用的是华为 Magic2，看了眼自带的时钟图标，
还挺顺眼，那就拿你下手了。下面是两个已经撸好的成品，左边是用 CSS 写的，右边是用 Canvas 画的，
由于时间关系 Canvas 没有画数字刻度。(就是懒而已😂)

<ClockCss :width="200" />
<ClockCanvas />

<style>
.clock-wrapper {
  margin-right: 48px;
  margin-bottom: 24px;
}
</style>

[CSS 时钟源码](https://github.com/joyran/yi-blog/blob/master/docs/.vuepress/components/Demo/Clock.vue)
[Canvas 时钟源码](https://github.com/joyran/yi-blog/blob/master/docs/.vuepress/components/Demo/ClockCanvas.vue)

接下来挑重点讲解下实现过程中一些我认为的难点😂，大神请略过。

<!-- more -->

### 刻度

刻度是啥，刻度是均匀分布在时钟内环的60个点或者线，用于指示具体时间。我想到的实现方式有四种。

- 背景图片，最 low 也是最简单的方法。
- CSS
- Canvas
- SVG

CSS 画刻度很简单，首先用 for 循环出来30个刻度，索引为5的倍数是时针的刻度，
要和秒针样式区分，故添加了一个`mark-hour`类。

```html
<div class="marks">
  <div
    v-for="(item, index) in 30"
    :class="[
      'mark',
      index % 5 === 0 ? 'mark-hour' : ''
    ]"
  />
</div>
```

刚刚我还说一共有60个刻度，怎么这里只有30个呢，原来用一个 div 表示两个刻度了，
在 div 上用伪类 before 表示12点的刻度，伪类 after 表示6点的刻度。

```css
.mark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform-origin: center center;

  &::before {
    content: '';
    display: inline-block;
    height: 0.1em;
    width: 1px;
    background-color: #fafafa;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0.1em;
  }

  &::after {
    content: '';
    display: inline-block;
    height: 0.1em;
    width: 1px;
    background-color: #fafafa;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.1em;
  }
}
```

第一个刻度好了后，第二个刻度只要以中心点旋转6°就好了，依次类推，这种有规律的变化当然得借助预处理器 less/scss 的循环了。
一开始用的是 less，因为 node-sass 真的太难安装了。但是这个 less 的 for 循环太反人类了，请自行感悟。

```css
mark-loop(@n, @i:1) when (@i <= @n) {
  .mark:nth-child(@{i}) {
    transform: rotate(6deg * (@i - 1));
  }
  mark-loop(@n, (@i + 1));
}

mark-loop(30);
```

由于实在忍受不了这种反人类的 for 循环写法，当机立断改用了 scss，来感受下 scss 的清爽。

```css
@for $i from 1 through 30 {
  .mark:nth-child(#{$i}) {
    transform: rotate(6deg * ($i - 1));
  }
}
```

### 数字刻度

数字刻度指的是时针的刻度，从0到12，也是用 css 画出来，但不能用上面刻度的旋转，
因为一旦旋转数字就歪了，所以需要用三角函数结合绝对定位把12个数字定位到时钟圆盘上。
可惜 scss 没有三角函数，在网上 copy 了一份封装好的三角函数引用
[sass-math](https://github.com/joyran/yi-blog/blob/master/docs/.vuepress/sass-math.scss)，
然后用 margin 调整下间距就完工了。

```css
@import '../../sass-math.scss';

@for $i from 1 through 12 {
  .hour-number-mark:nth-child(#{$i}) {
    left: 4em + 4em * cos((90 - $i * 30) * pi() / 180);
    bottom: 4em + 4em * sin((90 - $i * 30) * pi() / 180);
  }
}
```

### 时针

也是用绝对定位画一个时针，如下，分针和秒针同理。

```css
.hour-hand {
  position: absolute;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 50%;    /* 水平居中 */
  transform: translateX(-50%);   /* 水平居中 */
  /* X轴以中心点旋转，宽度的二分之一，Y轴以底部旋转 */
  transform-origin: 0.1em bottom;
  width: 0.2em;
  height: 30%;
  border-radius: 0.2em;
  background-color: #fff;
  transition: all 0.3s;
}
```

时针，分针和秒针画好后，接下来要让他们动起来，以秒针为例，每隔一秒都以顺时针旋转6°，
将旋转的角度设置为变量，然后调用 setInterval 每隔一秒重置一次角度变量达到秒针动起来的效果。

```vue
<template>
  <div
    class="second-hand"
    :style="{ transform: 'translateX(-50%) rotate(' + rotate.second + 'deg)' }"
  />
</template>

<script>
export default {
  data () {
    return {
      // 秒针的当前旋转角度
      rotate: {
        second: 0
      }
    }
  },

  created () {
    const time = new Date()
    this.calcRotate(time)

    // 每隔一秒执行一次
    this.interval = setInterval(() => {
      const time = new Date()
      this.calcRotate(time)
    }, 1000)
  },

  methods: {
    // 根据时间计算秒针的旋转角度
    calcRotate (time) {
      const second = time.getSeconds()
      this.rotate.second = second * 6
    }
  }
}
</script>
```

这样看似很完美，但有一个问题，当秒针指到59秒时，角度为354°，下一秒秒针跑到0秒了，角度变成了0°
由于秒针的旋转加了 transition 过渡动效，导致从354°变成0°时不是从354°平滑过渡到0°，
而是以逆时针旋转到0°，显然这样是不行的。我想到了两种解决方案，一种是角度不重置，而是一直增加，
比如从59秒到0秒，角度是从354°到360°，一直累加。第二种是从354°到0°时去掉 transition 过渡动效。
这里偷个懒用了第二种方案。

### 待优化

组件加了一个参数 width，当传入的 width 为100时，就会发现秒针还有刻度都有点歪曲，因为秒针的宽度用了 em，
当 width 变小，秒针宽度也变小，当秒针宽度小到一定程度且旋转一个角度时浏览器渲染就有问题了，出现了锯齿。

<ClockCss :width="100" />
