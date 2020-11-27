---
title: el-table 二次封装
date: 2020-11-25
---

中后台业务开发中表格算是用的最高频的组件之一了，表格通常还会搭配过滤组件、搜索组件、分页组件等，那么我们封装的组件 `yi-table` 得包含下面几个功能。

[[toc]]

<!-- more -->

正式介绍之前先来看一看最终呈现的效果，mock 数据本来用的是 `easy-mock`，不过动不动就访问不了也没辙，还好找到了一个[镜像站点](http://mock.jszhong.top/)。[yi-table 源码](https://github.com/joyran/yi-blog/blob/master/docs/.vuepress/components/YiTable.vue)，[yi-table-demo 源码](https://github.com/joyran/yi-blog/blob/master/docs/.vuepress/components/YiTableDemo.vue)。

<YiTableDemo />

### 数据自动获取和刷新

数据自动获取有两种方式，第一种是传入一个 url 在组件中获取数据，另外一种是在外面获取数据然后传给组件。如果要考虑通用性选择第二种方案，如果只针对特定的项目，可以考虑第一种方案。

```vue
<!-- yi-table.vue -->
<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }, // 表格数据
    dataTotal: {
      type: Number,
      default: 0
    }, // 总数量，用于分页
  }
}
</script>
```

虽然外部获取数据传进来可以做到对接任意系统，但这也就失去了我们二次封装 `el-table` 组件的初衷，我们的初衷就是不想重复写获取数据逻辑，搜索逻辑，分页逻辑，刷新逻辑等，综上考虑把数据获取放在组件内部实现。

```vue
<!-- yi-table.vue -->
<script>
import axios from 'axios'

export default {
  components: { ColumnRender },

  props: {
    url: String
  },

  data () {
    return {
      dataSource: [], // 表格数据
      dataTotal: 0, // 总数量，用于分页
    }
  },

  created () {
    this.getData()
  },

  methods: {
    async getData () {
      const { data } = await axios.get(this.url)
      this.dataSource = data.data.list
      this.dataTotal = data.data.total
    },
  }
}
</script>
```

### 自定义列配置

列是一个数组，用 columns 配置自定义列。

```js
columns: [{
  prop: 'name',
  label: '姓名'
}, {
  prop: 'email',
  label: '邮箱'
}, {
  prop: 'status',
  label: '状态'
}]
```

在组件中循环渲染自定义列。

```vue {3-7,21-24}
<!-- yi-table.vue -->
<el-table :data="dataSource">
  <el-table-column
    v-for="(item, index) in columns"
    :key="index"
    :label="item.label"
    :prop="item.prop" />
</el-table>

<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }, // 表格数据
    dataTotal: {
      type: Number,
      default: 0
    }, // 总数量，用于分页
    columns: {
      type: Array,
      default: () => []
    }, // el-table-column 配置项
  }
}
</script>
```

这种方式表面看起来不错，而且表格也成功渲染出来了，但是不够灵活，比如配置项多加了一个 width 字段，那模板中就要多写一行 `:width="item.width"` 了，稍微改下使得 `el-table-column` 可以接收对象作为 props，这样就支持所有属性了。

```html {5}
<el-table :data="dataSource">
  <el-table-column
    v-for="(item, index) in columns"
    :key="index"
    v-bind="item">
  </el-table-column>
</el-table>
```

同理可以添加一个 `table` 变量接收表格的 props

```js
table: {
  stripe: true,
  border: false
}
```

```vue {1}
<el-table :data="dataSource" v-bind="table">
  <el-table-column
    v-for="(item, index) in columns"
    :key="index"
    v-bind="item">
  </el-table-column>
</el-table>
```

表格第三列状态直接显示 `true` 或者 `false` 显然不能满足我们的需求的，我们想要的是一个开关，能直接操作开关切换用户状态。

![](https://img-cdn.wezhuiyi.com/yi-blog/yi-table-1.jpg)

想要实现在单元格中显示开关，给 `el-table-column` 添加 `slot` 即可。

```vue
<el-table-column>
  <template slot-scope="scope">
    <el-switch v-model="scope.row.status" />
  </template>  
</el-table-column>  
```

现在遇到了第一个难题，怎么把 `slot` 通过 `props` 传递给组件 `yi-table`，我采用的方案是渲染函数和 `JSX` 来实现，还不理解渲染函数和 `JSX` 可以看 [这里](https://cn.vuejs.org/v2/guide/render-function.html)。

首先新建一个 `ColumnRender` 函数式组件，用于渲染自定义列。

```vue
<!-- ColumnRender.vue -->
<script>
export default {
  name: 'ColumnRender',
  functional: true,
  props: {
    scope: Object,
    render: Function,
    value: String | Boolean | Number
  },
  render: (h, { props }) => {
    // 如果有 render 函数则用 render 函数渲染，否则显示原始值
    return props.render ? props.render(h, props.scope) : h('span', props.value)
  }
}
</script>
```

在 `yi-table` 组件中引入 `ColumnRender`。

```vue {7-9}
<template>
  <el-table :data="dataSource" v-bind="table">
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      v-bind="item">
      <template slot-scope="scope">
        <ColumnRender :scope="scope" :render="item.render" :value="scope.row[item.prop]" />
      </template>
    </el-table-column>
  </el-table>
</template>
```

那 `render` 函数怎么写呢，先来个示例瞧一瞧。

```jsx
render: (h, scope) => {
  return (
    <el-switch onChange={this.changeStatus} vModel={scope.row.status}></el-switch>
  )
}
```

JSX 的语法可以参考 [这里](https://github.com/vuejs/jsx#syntax)，需要注意的是 `v-model` 要写成 `vModel`，`change` 事件要写成 `onChange`，`changeStatus` 函数和之前一样写在 `methods` 中就可以监听了。另外 `v-if` 要用三元运算符代替，`v-for` 用 `map` 实现。

![](https://img-cdn.wezhuiyi.com/yi-blog/yi-table-2.jpg)

大部分表格都有增删改功能，把编辑和删除操作放在行方便操作，那就需要新增一列。

```jsx
{
  label: '操作',
  width: '140px',
  render: (h, scope) => {
    return (
      <div>
        <span onClick={() => this.handleEdit(scope.row)} class="link">编辑</span>
        <span onClick={() => this.handleEdit(scope.row)} class="link">删除</span>
      </div>
    )
  }
}
```

这里要注意的是 `JSX` 传参不能写成 `onClick={this.handleEdit(scope.row)}`，这样会直接执行函数，而不会在点击的时候执行，需要写成 `onClick={() => this.handleEdit(scope.row)}`

虽然通过 `render` 函数实现了自定义列，但是像编辑，删除的逻辑就交给父组件实现了，没有封装到 `yi-table` 组件中，如果你的项目中编辑、删除这些逻辑很固定，可以考虑放在 `yi-table` 组件内部，这样编辑后刷新，删除后刷新判断等逻辑都不需要再次处理了。

### 加载中状态、空状态

表格数据一开始是为空的，请求接口成功后才能显示内容，如果接口延迟大一点或者网速慢一点，就会出现一开始显示 `暂无数据`，过几秒等数据请求到了才显示内容，接下来优化这个问题。

在 `yi-table` 组件内部加一个状态 `fetching`，`true` 表示正在获取数据，`false` 表示数据获取完成，那么 `暂无数据` 这个空状态需要在 `fetching === false` 时显示，`fetching === true` 时显示 loading 加载中状态。

这种方案需要监听 API 请求，如果 API 请求是写在 `yi-table` 外部的话则无法实现监听。

```vue {12-15,30-33,40,50,54}
<!-- yi-table.vue -->
<template>
  <el-table :data="dataSource" v-bind="table" v-loading="fetching">
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      v-bind="item">
      <template slot-scope="scope">
        <ColumnRender :scope="scope" :render="item.render" :value="scope.row[item.prop]" />
      </template>
    </el-table-column>
    <!-- 空状态 -->
    <div slot="empty">
      <p v-if="!fetching">{{ emptyText }}</p>
    </div>
  </el-table>
</template>

<script>
import axios from 'axios'
import ColumnRender from './ColumnRender'

export default {
  components: { ColumnRender },

  props: {
    url: String,
    columns: Array, // el-table-column 配置项
    table: Object, // el-table 配置项
    emptyText: {
      type: String,
      default: '暂无数据'
    }, // 空数据文本
  },

  data () {
    return {
      dataSource: [], // 表格数据
      dataTotal: 0, // 总数量，用于分页
      fetching: true, // 加载中状态，默认为 true
    }
  },

  created () {
    this.getData()
  },

  methods: {
    async getData () {
      this.fetching = true
      const { data } = await axios.get(this.url)
      this.dataSource = data.data.list
      this.dataTotal = data.data.total
      this.fetching = false
    },
  }
}
</script>
```

### 分页

分页有前端分页和后端分页，不过大部分场景下都是后端分页，前端传分页参数 `page` 和 `pageSize` 实现，把这两个参数放在一个汇总变量 `queryParams` 里，后续要传什么参数都往 `queryParams` 里加。

`mock` 实现分页，获取 `pageSize`，然后 `for` 循环输出数据。

```js
{
  "code": 200,
  "data": {
    "list": function({
      _req,
      Mock
    }) {
      let _list = []
      let name = _req.query.name || ''
      let pageSize = parseInt(_req.query.pageSize) || 10
      pageSize = /[a-zA-Z0-9]/.test(name) ? 0 : pageSize
      let status = parseInt(_req.query.status)
      for (let i = 0; i < pageSize; i++) {
        _list.push(
          Mock.mock({
            "name": name + "@cname",
            "email": "@email",
            "status": status !== status ? "@boolean" : Boolean(status)
          })
        )
      }
      return _list
    },
    "total": function({
      _req,
      Mock
    }) {
      let name = _req.query.name || ''
      return /[a-zA-Z0-9]/.test(name) ? 0 : 34
    }
  }
}
```

```vue
<!-- yi-table.vue -->
<template>
  <el-pagination
    v-if="dataTotal > 0 && paginationProps.show"
    class="yi-pagination"
    v-bind="paginationProps"
    :total="dataTotal"
    @current-change="pageChange"
    @size-change="pageSizeChange"
    :current-page.sync="queryParams.page"
    :page-size.sync="queryParams.pageSize" />
</template>

<script>
export default {
  props: {
    pagination: Object, // 分页选项
  },

  data () {
    return {
      queryParams: {
        page: 1, // 当前页
        pageSize: 10, // 每页个数
      }, // 请求参数
    }
  },

  computed: {
    // 外部传进来的 props 和默认 props 合并
    paginationProps: function () {
      const defaultProps = {
        pageSizes: [10, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
        show: true
      }
      return Object.assign(defaultProps, this.pagination)
    }
  },

  methods: {
    pageChange () {
      this.getData()
    },

    pageSizeChange () {
      this.queryParams.page = 1
      this.getData()
    }
  }
}
</script>
```

### 搜索、过滤

过滤分两种情况，一种是在表头上的搜索，用 `el-table` 自带的属性实现，另外一种是在表格外面用 `el-select`，`el-datepicker` 等其他组件实现，这里聊聊后面一种的实现。

如果想要实现通过传 `props` 或者 `slot` 实现完全自定义有点难度，因为通过 `slot` 传进来一个 `el-select` 组件，还要绑定  `queryParams` 以及 `change` 事件，这些在外面是传不进来的，不妨换个思路提前定义好过滤组件类型，外面只要传 type ，`yi-table` 组件内部来渲染，下面试着加 `el-select` 和 `el-input` 组件。

```vue {4-21,34,38-45}
<!-- yi-table.vue -->
<template>
  <div>
    <!-- 搜索、过滤 -->
    <div class="yi-filter">
      <div v-for="(item, index) in filters" :key="index" class="yi-filter__item">
        <el-select
          v-if="item.type === 'select'"
          v-model="queryParams[item.field]"
          @change="getData" clearable v-bind="item.props">
          <el-option
            v-for="i in item.options" :key="i.value"
            :label="i.label" :value="i.value"/>
        </el-select>
        <el-input
          v-if="item.type === 'input'"
          v-model="queryParams[item.field]"
          @keyup.enter.native="getData"
          @change="getData" clearable v-bind="item.props">
        </el-input>
      </div>
    </div>

    <el-table />

    <el-pagination />
  </div>
</template>

<script>

export default {
  props: {
    filters: Array, // 过滤组件
  },

  created () {
    // queryParams 添加默认值
    this.filters.map(i => {
      if (i.hasOwnProperty('defaultValue')) {
        this.$set(this.queryParams, i.field, i.defaultValue)
      } else {
        this.$set(this.queryParams, i.field, '')
      }
    })
  }
}
</script>
```

外部传参

```js
filters: [
  {
    type: 'select',
    field: 'status',
    options: [{
      label: '启用',
      value: 1
    }, {
      label: '禁用',
      value: 0
    }],
    props: {
      placeholder: '状态'
    }
  },
  {
    type: 'input',
    field: 'name',
    defaultValue: '胡',
    props: {
      placeholder: '搜索姓名'
    }
  }
]
```
