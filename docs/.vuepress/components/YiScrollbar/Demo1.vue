<template>
  <div class="demo-1">
    <div class="demo-inner">

    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.demo-1 {
  height: 300px;
  overflow-y: auto;
  border-radius: 4px;

  /* 滚动条宽和高，分别对应垂直滚动条和横向滚动条 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* 滚动条上的滚动滑块，设置背景色和圆角 */
  &::-webkit-scrollbar-thumb {
    background: #CCCCCC;
    border-radius: 6px;
  }

  /* 滚动条上的滑轨属性，设置背景色和其他属性 */
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.demo-inner {
  height: 1000px;
  background: linear-gradient(0deg, #ebeef7, #dab9b9);
}
</style>
