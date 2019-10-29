<template lang="html">
  <div class="">
    <span>{{ num }}</span>
    <button @click="handleClick">点我</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 0
    }
  },

  methods: {
    handleClick () {
      this.num = this.num + 1
    }
  }
}
</script>

<style lang="scss">
</style>
