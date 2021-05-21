<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goods-item="item" :key="item.acm"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name: 'GoodList',
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

  .goods {
    display: flex;
    /* flex-wrap：默认情况下不换行，wrap表示换行，第一行在上方 */
    flex-wrap: wrap;
    /* justify-content定义了item在主轴上的对齐方式，space-around表示每个item两侧的间隔相等 */
    justify-content: space-around;

    padding: 2px;
  }

</style>