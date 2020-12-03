<template>
  <div class="font-effect__wrap">
    <p class="font-effect__text">HELLO WORLD</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.font-effect__wrap {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.font-effect__text {
  margin: 0;
  font-size: 80px;
  font-weight: bold;
  background-image: url('https://img-cdn.wezhuiyi.com/yi-blog/7966ce42-74c1-4969-bf3c-6c5c4e863224.gif');
  background-position: center;
  background-size: cover;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
