<template>
  <div v-show="visible">
    <div class="alert">
      <p class="alert-message">{{ message }}</p>
      <button class="alert-button" @click="handleClose">确定</button>
    </div>
    <div class="alert-mask" @click.self="handleClose"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      message: '',
      onClose: null
    }
  },

  watch: {
    visible: function (value) {
      if (value) {
        document.body.style.overflow = 'hidden'
      }
    }
  },

  methods: {
    handleClose () {
      this.visible = false
      document.body.style.overflow = 'auto'
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
      this.onClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  width: 320px;
  left: 50%;
  transform: translate(-50%, 0);
  top: 20%;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  z-index: 1001;
}

.alert-message {
  font-size: 14px;
  line-height: 22px;
  color: #333;
  margin-bottom: 32px;
}

.alert-button {
  min-width: 80px;
  padding: 8px 24px;
  text-align: center;
  background: #0075de;
  border: 0;
  outline: 0;
  float: right;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.alert-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 1000;
}
</style>
