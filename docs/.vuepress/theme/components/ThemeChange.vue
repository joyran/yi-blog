<template>
  <div class="theme-change" @click="themeChange">
    <img v-if="mode === 'dark'" src="https://img-cdn.wezhuiyi.com/yi-blog/dark-mode.svg" alt="">
    <img v-else src="https://img-cdn.wezhuiyi.com/yi-blog/light-mode.svg" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 'light'
    }
  },

  created () {
    this.mode = window.localStorage.getItem('theme-mode') || 'light'
  },

  watch: {
    mode: {
      handler: function (value) {
        if (value === 'dark') {
          document.body.style.setProperty('--color-background', '#141414');
          document.body.style.setProperty('--color-text', 'rgba(255,255,255,0.85)');
          document.body.style.setProperty('--color-border', 'rgba(255,255,255,0.12)');
          document.body.style.setProperty('--color-code', 'rgba(255,255,255,0.85)');
          document.body.style.setProperty('--color-code-background', '#363636');
          document.body.style.setProperty('--color-theme-background', 'rgba(255,255,255,0.85)');
        } else {
          document.body.style.setProperty('--color-background', '#FFFFFF');
          document.body.style.setProperty('--color-text', '#2c3e50');
          document.body.style.setProperty('--color-border', '#eaecef');
          document.body.style.setProperty('--color-code', '#ff502c');
          document.body.style.setProperty('--color-code-background', '#fff5f5');
          document.body.style.setProperty('--color-theme-background', '#FFFFFF');
        }
      },
      immediate: true
    }
  },

  methods: {
    themeChange () {
      if (this.mode === 'light') {
        this.mode = 'dark'
        window.localStorage.setItem('theme-mode', 'dark')
      } else {
        this.mode = 'light'
        window.localStorage.setItem('theme-mode', 'light')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-change {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--color-theme-background);
  box-shadow: 2px 2px 8px 4px rgba(0,0,0,0.10);

  img {
    width: 40px;
    height: 40px;
  }
}
</style>
