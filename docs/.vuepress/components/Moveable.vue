<!-- 可移动的组件 -->
<template>
  <div
    ref="moveable"
    class="moveable"
    @mousedown="handleMouseDown"
  >
    <slot />
  </div>
</template>

<script>
export default {
  methods: {
    handleMouseDown (e) {
      // 鼠标按下时初始位置
      const initClientX = e.clientX
      const initClientY = e.clientY

      // div 初始偏移
      const initLeft = this.$refs.moveable.style.left === '' ? 0 : parseInt(this.$refs.moveable.style.left)
      const initTop = this.$refs.moveable.style.top === '' ? 0 : parseInt(this.$refs.moveable.style.top)

      // 绑定鼠标移动事件到 document，如果绑定到移动的元素上鼠标移动过快会导致鼠标移出div
      document.onmousemove = (e) => {
        console.log(e.clientX, e.clientY);
        // 移动过程偏移为初始偏移加上鼠标移动的距离
        const left = initLeft + e.clientX - initClientX
        const top = initTop + e.clientY - initClientY
        this.$refs.moveable.style.left = left + 'px'
        this.$refs.moveable.style.top = top + 'px'
      }

      // 鼠标松开注销事件
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.moveable {
  position: relative;
  display: inline-block;

  &:hover {
    cursor: move;
  }
}
</style>
