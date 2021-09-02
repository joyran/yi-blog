<script>
export default {
  name: 'YiForm',
  functional: true,

  data: {
    form: {}
  },

  props: {
    config: Object
  },

  render: (h, { props }) => {
    return h(
      props.config.name,
      {
        props: props.config.props
      },
      props.config.children.map(children => {
        return h(
          children.name,
          {
            props: Object.assign({}, children.props),
            attrs: children.attrs
          }
        )
      })
    )
  }
}
</script>

<style>

</style>