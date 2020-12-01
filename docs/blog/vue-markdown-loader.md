---
title: 一个超简单的 vue-markdown-loader
date: 2020-11-30
---

得益于 `vuepress` 的强大功能，我们可以直接在 markdown 中写文章，然后自动渲染为文章内容。接下来实现一个简单的 `vue-markdown-loader`，将 .md 文件转换为文章内容。

webpack 是无法直接处理 .md 格式文件的，直接 `import` 会报错，此时需要一个 `loader` 来处理，这个 `loader` 的作用就是把 .md 文件转换为 html 格式，然后加上 `<template></template>` 标签丢给 `vue-loader` 处理。其实我们平常写的单文件组件 `.vue` 也是由 `vue-loader` 处理的。

新建一个 `md-loader.js` 文件，复制下面代码，一个最简单的 `vue-markdown-loader` 就完成了。

```js
const md = require('markdown-it')()

module.exports = function (source) {
  this.cacheable()

  // source 是原始文件内容，html 是用 markdown-it 编译后的 html 内容
  const html = md.render(source)

  const template = (
    `<template>
      <div class="markdown-body">
        ${html}
      </div>
    </template>`
  )

  return template
}
```

<!-- more -->

### Loader 配置

loader 写好后还要在 webpack 配置文件中配置，下面例子是 `vue.config.js` 的配置。

```js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('vue-loader')
        .loader('vue-loader')
        .end()
      .use('md-loader')
        .loader(path.resolve(__dirname, 'src/loaders/md-loader.js'))
        .end()
  }
}
```

配置好了在组件中引用，这里假设 `test.md` 是一篇 md 文章。

```html
<template>
  <Test />
</template>

<script>
import Test from './test.md'

export default {
  components: {
    Test
  }
}
</script>
```

### 代码高亮、自定义容器

接下来加上代码高亮、样式处理以及自定义容器。

```js
const hljs = require('highlight.js')
const cheerio = require('cheerio')
const md = require('markdown-it')()
const mdContainer = require('markdown-it-container')

module.exports = function (source) {
  this.cacheable()

  md.set({
    linkify: true, // 将类似 URL 的文本自动转换为链接。
    html: false, // Enable HTML tags in source
    // 代码高亮
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
          )
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      )
    }
  })

  // 自定义容器，:::tip 会转换为 <div class="tip">
  md.use(mdContainer, 'tip')
  md.use(mdContainer, 'warning')

  const html = md.render(source)

  const $ = cheerio.load(html, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false
  })

  const style = $.html('style')

  $('style').remove()

  const temp = $.html()

  const template = (
    `<template>
      <div class="markdown-body">
        ${temp}
      </div>
    </template>
    ${style}`
  )

  return template
}
```

虽然 .md 文件已经能被正常解析了，但还是没有任何样式，需要导入两个样式文件。

- [github-markdown.css](https://github.com/joyran/yi-blog/blob/master/docs/.vuepress/github-markdown.css)
- [highlight-atom-one-light.css](https://github.com/joyran/yi-blog/blob/master/docs/.vuepress/highlight-atom-one-light.css) 代码高亮样式

### 自动注册路由

目前这种方式还需要手动引入 md 文件，然后注册组件并使用，还是有点麻烦，可以把一篇 md 文件自动注册为一个对应的组件，然后注册到路由中。

```vue
<!-- blog.vue -->
<template lang="html">
  <router-view></router-view>
</template>
```

```js
// router.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 遍历 blog 目录下所有 md 文件, 并生成路由
const blogRoutes = []
const blogs = require.context('@/blog', false, /\w+\.(md)$/)
blogs.keys().forEach(fileName => {
  const reg = /\.\/(.+).md/
  const name = fileName.match(reg)[1]
  blogRoutes.push({
    path: name,
    name: name,
    component: resolve => require([`@/blog/${name}.md`], resolve)
  })
})

const routes = [
  {
    path: '/blog',
    name: 'blog',
    component: resolve => require(['@/views/blog'], resolve),
    children: blogRoutes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

此时在 blog 文件夹下面新建一个 test.md 文件，则自动生成一个 `/blog/test` 路由，直接访问即可。

### 批量注册全局组件

在 `vuepress` 中可以直接引用 `.vuepress/components` 中的组件，这得益于批量注册全局组件的能力。

```js
// auto-register.js
// 自动注册全局组件
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// 将components目录下所有子组件注册为全局组件
const requireComponent = require.context('@/components', false, /\w+\.(vue)$/)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName =
    upperFirst(
      camelCase(
        // 获取和目录深度无关的文件名
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

```js
// main.js
import './auto-register'
```
