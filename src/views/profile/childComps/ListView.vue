<template>
  <div class="list-view">
    <div class="list-item" v-for="item in datas" :key="item.acm">
      <span class="icon">
        <svg :fill="item.iconColor"> <use :xlink:href="item.icon"></use> </svg>
      </span>
      <div class="info">
        {{item.info}}
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
    datas: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .list-view {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  .list-item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon {
    position: absolute;
    top: 3px;
    left: 15px;
  }
  .icon svg {
    width: 18px;
    height: 18px;
  }

  .info {
    margin-left: 40px;
    padding-left: 5px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .list-item:last-of-type .info {
    border-bottom: none;
  }
</style>