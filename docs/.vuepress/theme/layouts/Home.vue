<!-- 博客首页 -->
<template>
  <div class="index">
    <!-- <img alt="" :src="$withBase('/home.jpg')"> -->
    <div class="body">
      <router-link class="button" :to="{ path: '/blog/' }">HELLO</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.index {
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(to right, #cc00ff, #767dec);
  filter: hue-rotate(0deg);
  height: 100vh;
  animation: hueRotate 20s infinite alternate;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.7;
  }

  .body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .button {
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: transparent;
      border: 2px solid #ffffff;
      font-size: 16px;
      color: #fff;
      border-radius: 40px;
      cursor: pointer;
      position: relative;
    }
  }
}

@keyframes hueRotate {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
</style>
