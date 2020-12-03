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
  background: linear-gradient(94.23deg,#5374fa 12.41%,#fd9179 52.55%,#ff6969 89.95%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
