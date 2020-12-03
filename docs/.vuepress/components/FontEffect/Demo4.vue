<template>
  <div class="font-effect__wrap">
    <p class="font-effect__text" ref="text">HELLO WORLD</p>
  </div>
</template>

<script>
export default {
  mounted () {
    window.addEventListener('scroll', this.handleOnScroll)
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleOnScroll)
  },

  methods: {
    handleOnScroll () {
      // 网页高度
      const clientHeight = document.documentElement.clientHeight
      // 字体底部距离浏览器顶部的距离
      const bottom = this.$refs.text.getBoundingClientRect().bottom
      // 当网页高度大于字体底部距离浏览器顶部的距离时表明字体进入可视范围了，加个 100 用作缓存
      if (bottom < clientHeight - 100) {
        const progress = (clientHeight - bottom) * 100 * 2.5 / clientHeight
        const progress1 = -100 + progress
        this.$refs.text.style.setProperty('--gradient-progress-1', `${progress1}%`)
        this.$refs.text.style.setProperty('--gradient-progress-2', `${progress}%`)
      } else {
        this.$refs.text.style.setProperty('--gradient-progress-1', '-100%')
        this.$refs.text.style.setProperty('--gradient-progress-2', '0%')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.font-effect__wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.font-effect__text {
  --gradient-progress-1: -100%;
  --gradient-progress-2: 0%;
  font-size: 80px;
  font-weight: bold;
  background-image: linear-gradient(135deg, #000 var(--gradient-progress-1), #fff var(--gradient-progress-2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 400px;
}
</style>
