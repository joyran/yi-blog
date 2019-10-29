<template lang="html">
  <div class="">
    <div class="" v-for="(item, index) in $site.pages" :key="index">
      {{ item.excerpt }}
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
</style>
