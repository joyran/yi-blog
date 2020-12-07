<template>
  <div class="yi-scrollbar">
    <!-- 外层容器，定义滚动范围 -->
    <div class="yi-scrollbar__wrap" :style="wrapStyle" ref="wrap" @scroll="handleScroll">
      <div class="yi-scrollbar__view" ref="view">
        <!-- 容器通过插槽引入 -->
        <slot></slot>
      </div>
    </div>
    <!-- 模拟滑轨和滑块 -->
    <div
      v-if="thumbVisible"
      class="yi-scrollbar__track"
      :class="{ visible: mouseDown }"
      @mousedown.self="mousedownTrack">
      <div
        class="yi-scrollbar__thumb"
        @mousedown="mousedownThumb"
        :style="thumbStyle">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      thumb: {
        height: '0%',
        translateY: '0%'
      },
      wrapHeight: 0,
      viewHeight: 0,
      mouseDown: false,
      scale: 0,
      init: {
        clientY: 0,
        scrollTop: 0
      },
      thumbVisible: false,
      scrollBarWidth: 0
    }
  },

  computed: {
    thumbStyle: function () {
      return {
        height: this.thumb.height,
        transform: `translateY(${this.thumb.translateY})`
      }
    },

    wrapStyle: function () {
      return {
        marginRight: `-${this.scrollBarWidth}px`,
        marginBottom: `-${this.scrollBarWidth}px`
      }
    }
  },

  mounted () {
    this.getScrollbarWidth()
    this.wrapHeight = this.$refs.wrap.clientHeight
    this.viewHeight = this.$refs.view.clientHeight

    // 只有在内层容器大于外层容器高度时才显示滚动条
    this.thumbVisible = this.viewHeight > this.wrapHeight
    this.calcThumbHeight()
  },

  destroyed () {
    document.removeEventListener('mouseup', this.mouseupThumb, false)
  },

  methods: {
    // 获取滚动条宽度
    getScrollbarWidth () {
      const outer = document.createElement('div')
      outer.style.visibility = 'hidden'
      outer.style.width = '100px'
      outer.style.position = 'absolute'
      outer.style.top = '-9999px'
      document.body.appendChild(outer)

      const widthNoScroll = outer.offsetWidth
      outer.style.overflow = 'scroll'

      const inner = document.createElement('div')
      inner.style.width = '100%'
      outer.appendChild(inner)

      const widthWithScroll = inner.offsetWidth
      outer.parentNode.removeChild(outer)

      this.scrollBarWidth = widthNoScroll - widthWithScroll
    },

    // 计算滚动条滑块高度
    calcThumbHeight () {
      this.thumb.height = (this.wrapHeight / this.viewHeight) * 100 + '%'
      const thumbHeight = this.wrapHeight * this.wrapHeight / this.viewHeight

      // scrollTop 最大值 / 滑块可以滚动的距离，这样计算出滑块滑动距离后乘以该系数就能得到 scrollTop 值
      this.scale = (this.viewHeight - this.wrapHeight) / (this.wrapHeight - thumbHeight)
    },

    // 监听滚动事件重置滚动条的Y轴偏移量
    handleScroll (e) {
      this.thumb.translateY = (e.target.scrollTop / this.wrapHeight) * 100 + '%'
    },

    // 监听鼠标在滑块上点击的事件
    mousedownThumb (e) {
      e.stopImmediatePropagation()
      this.mouseDown = true

      // 记录鼠标点击初始偏移量
      this.init.clientY = e.clientY
      this.init.scrollTop = this.$refs.wrap.scrollTop

      // 事件添加到 document 上是为了拖拽滑块的时候鼠标移出内容区域也能响应事件
      document.addEventListener('mousemove', this.mousemoveThumb, false)
      document.addEventListener('mouseup', this.mouseupThumb, false)

      // 在滚动的时候禁止选中文本
      document.onselectstart = () => false
    },

    // 监听鼠标拖拽事件
    mousemoveThumb (e) {
      if (!this.mouseDown) return

      // 当前鼠标位置减去初始鼠标位置得到鼠标拖拽的偏移量
      const offset = e.clientY - this.init.clientY
      // 鼠标拖拽偏移量乘以上面计算的系数得出 scrollTop
      const scrollTop = offset * this.scale
      // scrollTop 一定要加上初始 scrollTop
      this.$refs.wrap.scrollTop = this.init.scrollTop + scrollTop
    },

    // 监听鼠标离开事件
    mouseupThumb (e) {
      this.mouseDown = false
      this.init.scrollTop = 0

      // 这里要移除拖拽事件，不然鼠标离开了有可能拖拽事件还在执行
      document.removeEventListener('mousemove', this.mousemoveThumb, false)
      document.onselectstart = null
    },

    // 监听滑轨点击事件，直接滚动到指定位置
    mousedownTrack (e) {
      // 鼠标在元素内偏移量为鼠标距离顶部的距离减去元素顶部偏移
      const offset = e.clientY - e.target.getBoundingClientRect().top
      // 根据鼠标点击位置偏移量计算 scrollTop
      const scrollTop = (offset / this.wrapHeight) * this.viewHeight  - this.wrapHeight / 2
      this.$refs.wrap.scrollTop = scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
.yi-scrollbar {
  overflow: hidden;
  position: relative;

  &:hover {
    .yi-scrollbar__track {
      opacity: 1;
    }
  }
}

.yi-scrollbar__wrap {
  overflow: auto;
  height: 100%;
}

.yi-scrollbar__track {
  position: absolute;
  right: 4px;
  top: 2px;
  bottom: 2px;
  width: 6px;
  opacity: 0;
  transition: opacity 120ms ease-out;
  border-radius: 4px;
  z-index: 1;
  cursor: pointer;

  &.visible {
    opacity: 1;
  }
}

.yi-scrollbar__thumb {
  background-color: rgba(144,147,153,0.3);
  cursor: pointer;
  width: 100%;
  transition: .3s background-color;
  border-radius: 4px;

  &:hover {
    background-color: rgba(144,147,153,0.5);
  }
}
</style>
