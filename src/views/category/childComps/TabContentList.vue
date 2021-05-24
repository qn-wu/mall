<template>
  <div class="item">
    <div class="item-info" v-for="item in subcontent" :key="item.acm">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-title"> {{item.title}} </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabContentList',
  props: {
    subcontent: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: center;
    font-size: 12px;
  }

  .item-info {
    flex: 0 0 30%;
    margin-top: 20px;
  }

  .item-img {
    width: 64.8px;
    height: 64.8px;
  }

  .item-title {
    margin-top: 15px;
  }
</style>