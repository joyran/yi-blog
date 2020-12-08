<template>
  <div class="event-demo-2">
    <el-input v-model="message" placeholder="要发送的消息" @keyup.enter.native="handleSend" />
    <el-button type="primary" @click="handleSend">发送</el-button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      message: ''
    }
  },

  methods: {
    handleSend () {
      this.$event.emit('send', this.message)
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.event-demo-2 {
  display: flex;
  align-items: center;

  .el-input {
    margin-right: 12px;
  }
}
</style>
