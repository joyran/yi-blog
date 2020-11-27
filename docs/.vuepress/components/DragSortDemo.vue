<template lang="html">
  <DragSort v-model="list">
    <div class="drag-item" v-for="item in list" :key="item.id">{{ item.name }}</div>
  </DragSort>
</template>

<script>
export default {
  name: 'DragSortDemo',

  data () {
    return {
      list: [
        {
          id: 1,
          name: 'item 1'
        },
        {
          id: 2,
          name: 'item 2'
        },
        {
          id: 3,
          name: 'item 3'
        },
        {
          id: 4,
          name: 'item 4'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-item {
  height: 40px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  padding-left: 24px;
  font-weight: bold;
  border: 1px solid #dedede;
  margin-bottom: 12px;
}
</style>
