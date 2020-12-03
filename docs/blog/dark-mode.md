---
title: 夜间模式主题切换
date: 2020-12-01
---

这年头夜间模式越来越火，要是哪个 App 不支持夜间模式都说不过去了，当然了夜间模式有的地方也叫深色模式，
咱不是设计师也说不清楚这两个的区别，暂且就统一叫做夜间模式了，对应的还有日间模式。
接下来要聊的是前端如何在夜间模式和日间模式之间切换自如，下图为华为系统的日间模式和夜间模式对比图。

<div class="dark-mode-flex">
  <div>
    <img src="https://img-cdn.wezhuiyi.com/yi-blog/%E6%97%A5%E9%97%B4%E6%A8%A1%E5%BC%8F.jpg" alt="日间模式" />
    <p>日间模式</p>
  </div>
  <div>
    <img src="https://img-cdn.wezhuiyi.com/yi-blog/%E5%A4%9C%E9%97%B4%E6%A8%A1%E5%BC%8F.jpg" alt="夜间模式" />
    <p>夜间模式</p>
  </div>
</div>

<!-- more -->

我想到方案有四种，至于用哪一种看情况咯。

[[toc]]

### 添加全局类

在 body 上添加一个 dark class，然后写一个 dark 主题 css 文件，比如这样，此时文字颜色和背景就已经变了。

```css
.dark {
  background-color: #141414;
}

.dark p {
  color: rgba(255,255,255,0.85);
}
```

### 加载不同的样式文件

如果你的主题之间差异很大，每个主题都有一个主题 css 文件来管理，那可以通过在切换主题的时候切换 css 文件来实现。

```js
// 添加夜间模式主题
const link = document.createElement('link')
link.href = 'https://ant.design/dark.css'
link.setAttribute('rel', 'stylesheet')
link.setAttribute('type', 'text/css')
link.setAttribute('id', 'light-mode')
document.querySelector('head').appendChild(link)

// 删除夜间模式主题
const light = document.getElementById('light-mode')
light && document.querySelector('head').removeChild(light)
```

### 批量修改 style

假设有这样一种场景，项目中引用了 `element-ui` 组件库，`element-ui` 没有提供换肤功能，
而产品要求网站主题色可以切换为任意颜色。这种情况下能想到的就是通过 js 获取 style，然后批量替换主题色。
这种情况下组件库和其他 css 不能通过引入外部文件的方式，只能通过内嵌 style 的方式，不然 js 无法操作 style。
`element-ui` 给定一个主题色后会根据自身规则出来 10 个色系，那么在替换颜色的时候这 10 个色系都要替换。

首先生成两套调色板，分别为旧主题和新主题
```js
import tinycolor from 'tinycolor2'
const white = tinycolor('#FFFFFF')
const black = tinycolor('#000000')

// 根据主题生成调色板
function getThemeCluster (themeColor) {
  var primary = tinycolor(themeColor)
  var primary1 = tinycolor.mix(white, primary, 10).toHexString().toUpperCase()
  var primary2 = tinycolor.mix(white, primary, 20).toHexString().toUpperCase()
  var primary3 = tinycolor.mix(white, primary, 40).toHexString().toUpperCase()
  var primary4 = tinycolor.mix(white, primary, 60).toHexString().toUpperCase()
  var primary5 = tinycolor.mix(white, primary, 80).toHexString().toUpperCase()
  var primary6 = primary.toHexString().toUpperCase()
  var primary7 = tinycolor.mix(black, primary, 80).toHexString().toUpperCase()
  var primary8 = tinycolor.mix(black, primary, 60).toHexString().toUpperCase()
  var primary9 = tinycolor.mix(black, primary, 40).toHexString().toUpperCase()
  var primary10 = tinycolor.mix(black, primary, 20).toHexString().toUpperCase()

  return [
    primary1, primary2, primary3, primary4, primary5,
    primary6, primary7, primary8, primary9, primary10
  ]
}
```

获取所有的 style 标签并替换
```js
// 更新调色板
function updateStyle (style, oldCluster, newCluster) {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}

const activeThemeColors = getThemeCluster(themes[oldTheme]) // 旧主题色板
const themeColors = getThemeCluster(themes[newTheme]) // 新主题色板

const styles = [].slice.call(document.querySelectorAll('style'))
styles.forEach((style) => {
  const innerText = style.innerText
  if (typeof innerText !== 'string') return
  style.innerText = updateStyle(innerText, activeThemeColors, themeColors)
})
```

除非是走投无路，这种方案还是不要用了，效率非常低下。

### CSS 变量

目前 css 变量在主流浏览器上都已经支持了，当然除了IE，我个人最推荐的当属[css 变量](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)了，我自己的博客主题切换也是用 css 变量实现的。

![](https://img-cdn.wezhuiyi.com/yi-blog/css-variables.jpg)

首先在 :root 上添加两个变量
```css
:root {
  --color-background: #FFFFFF;
  --color-text: #2c3e50;
}
```

然后在 css 里引用变量
```css
body {
  background-color: var(--color-background);
  color: var(--color-text);
}
```

然后在切换主题的按钮上执行 js
```js
document.body.style.setProperty('--color-background', '#141414');
document.body.style.setProperty('--color-text', '#FFFFFF');
```
