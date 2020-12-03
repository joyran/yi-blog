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
  background-image: url('https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?cs=srgb&dl=pexels-emiliano-arano-1295138.jpg&fm=jpg');
  background-position: center;
  background-size: cover;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
