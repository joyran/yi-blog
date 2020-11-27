<template lang="html">
  <div class="">
    <el-button type="primary" @click="handleAlert">Alert</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleAlert () {
      this.$alert({
        message: 'hello world',
        onClose: function () {
          console.log('closed')
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
