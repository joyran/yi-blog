<template>
  <div class="event-demo-1">
    <p class="title">接收到的消息如下：</p>
    <p v-for="(i, index) in list" :key="index" class="item">
      {{ i }}
    </p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: []
    }
  },

  created () {
    this.$event.on('send', message => {
      this.list.push(message)
    })
  }
}
</script>

<style lang="scss" scoped>
.event-demo-1 {
  border: 1px solid #ebebeb;
  padding: 16px 20px;
  margin-bottom: 20px;

  p {
    margin: 0;
    font-size: 14px;
  }

  .title {
    color: #999;
    margin-bottom: 4px;
  }
}
</style>
