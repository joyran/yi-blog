<!-- el-table 二次封装 -->
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
            :label="i.label" :value="i.value" />
        </el-select>
        <el-input
          v-if="item.type === 'input'"
          v-model="queryParams[item.field]"
          @keyup.enter.native="getData"
          @change="getData" clearable v-bind="item.props">
        </el-input>
      </div>
    </div>

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
        <p v-if="!fetching">{{ inFilter ? filterEmptyText : emptyText }}</p>
      </div>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="dataTotal > 0 && paginationProps.show"
      class="yi-pagination"
      v-bind="paginationProps"
      :total="dataTotal"
      @current-change="pageChange"
      @size-change="pageSizeChange"
      :current-page.sync="queryParams.page"
      :page-size.sync="queryParams.pageSize" />
  </div>
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
    }, // 空数据文案
    filterEmptyText: {
      type: String,
      default: '暂未搜索到数据'
    }, // 搜索为空文案
    pagination: {
      type: Object,
      default: () => {}
    }, // 分页选项
    filters: Array, // 过滤组件
  },

  data () {
    return {
      dataSource: [], // 表格数据
      dataTotal: 0, // 总数量，用于分页
      fetching: true, // 加载中状态，默认为 true
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
      return Object.assign({}, defaultProps, this.pagination)
    },

    // 是否在搜索中状态
    inFilter: function () {
      const params = JSON.parse(JSON.stringify(this.queryParams))
      delete params.page // page 和 pageSize 默认有值的不能用于判断是否在搜索中状态
      delete params.pageSize
      const values = Object.values(params)
      return values.findIndex(v => !!v) !== -1
    }
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

    this.getData()
  },

  methods: {
    async getData () {
      this.fetching = true
      const { data } = await axios.get(this.url, {
        params: this.queryParams
      })
      this.dataSource = data.data.list
      this.dataTotal = data.data.total
      this.fetching = false
    },

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

<style lang="scss">
.yi-pagination {
  display: flex;
  justify-content: flex-end;
  margin: 24px 0;
}

.yi-filter {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.yi-filter__item {
  margin-right: 10px;
}
</style>
