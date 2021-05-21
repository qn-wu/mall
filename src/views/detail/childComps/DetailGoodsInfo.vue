<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length != 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc"> {{detailInfo.desc}} </div>
      <div class="end"></div>
    </div>
    <div class="good-detail-info" v-for="item in detailInfo.detailImage" :key="item.acm">
      <div class="info-key"> {{item.key}} </div>
      <div class="info-list">
        <img  v-for="imag in item.list" :src="imag" :key="imag.acm" @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imgLength: 0
    }
  },
  watch: {
    detailInfo() {
      this.imgLength=this.detailInfo.detailImage[0].list.length
    }
  },
  methods: {
    imgLoad() {
      // 图片都加载完后才向父组件发送事件
      if (++this.counter==this.imgLength) {
        this.$emit('goodsImg')
      }
    }
  }
}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .start, .end {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  } 
  .start {
    float: left;
  }
  .end {
    float: right;
  }
  /* 黑色的小方块 */
  .start::before, .end::after{
    content: '';
    position: absolute;
    bottom: 0;
    width: 5px;
    height: 5px;
    background-color: #333;
  }
  .end::after {
    right: 0;
  }

  .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    font-size: 15px;
    color: var(--color-high-text);
  }
  .info-list img {
    width: 100%;
  }
</style>