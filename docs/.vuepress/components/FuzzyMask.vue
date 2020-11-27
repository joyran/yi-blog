<template>
  <div class="fuzzy-mask">
    <p>当前套餐不支持此功能，您可以联系客服</p>
  </div>
</template>

<script>
export default {
  name: 'FuzzyMask'
}
</script>

<style lang="scss">
.fuzzy-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
