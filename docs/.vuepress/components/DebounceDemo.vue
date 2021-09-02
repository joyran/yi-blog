<template>
  <div></div>
</template>

<script>
import { debounce, throttle} from './util'

// const onResize = debounce(print, 1000)
// const onScroll = throttle(printScrollTop, 1000)

export default {
  data () {
    return {
      onResize: debounce(this.print, 1000),
      onScroll: throttle(this.printScrollTop, 1000)
    }
  },

  mounted () {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
  },

  destroyed () {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    print () {
      const width = window.innerWidth
      const height = window.innerHeight
      console.log('防抖：', width, height)
    },

    printScrollTop () {
      console.log('节流：', parseInt(new Date().getTime() / 1000), document.documentElement.scrollTop)
    }
  }
}
</script>

<style>

</style>