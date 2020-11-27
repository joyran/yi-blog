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
