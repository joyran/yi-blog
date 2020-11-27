<template>
  <YiTable
    ref="yiTable"
    :url="url"
    :columns="columns"
    :table="table"
    :pagination="pagination"
    :filters="filters" />
</template>

<script>
export default {
  name: 'YiTableDemo',

  data () {
    return {
      url: 'http://mock.jszhong.top/mock/5fbf59becdc5d532a510715d/api/users',
      columns: [{
        prop: 'name',
        label: '姓名'
      }, {
        prop: 'email',
        label: '邮箱'
      }, {
        prop: 'status',
        label: '状态',
        width: '120px',
        render: (h, scope) => {
          return (
            <el-switch onChange={this.changeStatus} vModel={scope.row.status}></el-switch>
          )
        }
      }, {
        label: '操作',
        width: '140px',
        render: (h, scope) => {
          return (
            <div>
              <span onClick={() => this.handleEdit(scope.row)} class="link">编辑</span>
              <span onClick={() => this.handleDelete(scope.row)} class="link">删除</span>
            </div>
          )
        }
      }],
      table: {
        stripe: false
      },
      pagination: {
        pageSizes: [10, 20]
      },
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
          defaultValue: '',
          props: {
            placeholder: '姓名，搜索英文返回空'
          }
        }
      ]
    }
  },

  methods: {
    changeStatus (status) {
      console.log(status)
    },

    handleEdit (row) {
      console.log(row)
    },

    handleDelete (row) {
      this.$confirm(`确认删除${row.name}吗？`, {
        type: 'warning'
      })
        .then(() => {
          this.$refs.yiTable.getData()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.link {
  color: #0075de;
  cursor: pointer;

  & + .link {
    margin-left: 16px;
  }
}

th, td {
  border: 0;
}

table {
  margin: 0;
}

.el-table .cell, .el-table th>.cell {
  padding: 0 16px;
}
</style>
