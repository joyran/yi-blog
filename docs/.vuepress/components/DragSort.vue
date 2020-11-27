<!-- 可拖拽排序 -->
<template lang="html">
  <div class="drag-sort">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DragSort',

  model: {
    prop: 'list',
    event: 'change'
  },

  props: {
    list: Array
  },

  data () {
    return {
      translate: {
        x: 0,
        y: 0
      }, // 子项偏移值
      start: {
        x: 0,
        y: 0
      }, // 鼠标初始按下的位置
      draging: false, // 是否正在拖拽中
      dragIndex: 0, // 当前被拖拽的子项索引
    }
  },

  mounted () {
    this.$slots.default.forEach((item, index) => {
      item.elm.onmousedown = (e) => {
        const style = document.querySelectorAll('.drag-item')[0].style.transform
        const find = style.match(/\d+/g)
        const currentX = find ? find[0] : 0
        const currentY = find ? find[1] : 0
        this.start.x = e.clientX - currentX
        this.start.y = e.clientY - currentY
        this.draging = true
        this.dragIndex = index
      }

      item.elm.onmousemove = (e) => {
        if (this.draging) {
          this.translate.x = e.clientX - this.start.x
          this.translate.y = e.clientY - this.start.y
          item.elm.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px)`
        }
      }
    })

    window.addEventListener('mouseup', () => {
      this.draging = false
    })
  }
}
</script>

<style lang="scss" scoped>
.drag-sort {

}
</style>
