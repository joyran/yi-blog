<template>
  <YiForm :config="config" />
</template>

<script>
export default {
  data () {
    return {
      config: {
        name: 'el-form',
        props: {
          labelWidth: '100px'
        },
        children: [
          {
            name: 'el-input',
            vModel: 'username',
            props: {
              size: 'large',
              clearable: true
            },
            attrs: {
              placeholder: '请输入用户名'
            }
          },
          {
            name: 'el-input',
            vModel: 'password',
            props: {
              size: 'large',
              clearable: true
            },
            attrs: {
              placeholder: '请输入用户名'
            }
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>