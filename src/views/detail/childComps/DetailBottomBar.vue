<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addToCart')
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background-color: #fff;
  }

  .bar-item {
    display: flex;
    flex: 1;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 3px;
    /* 第一个数字0表示背景颜色；0/100%中，0是background-position的属性简写，100%是background-size的属性简写 */
    background: url('~assets/img/detail/detail_bottom.png') 0 2px/100%;
  }

  .bar-left .service {
    background-position: 0 -52px;
  }

  .bar-left .shop {
    background-position: 0 -96px;
  }

  .bar-right {
    line-height: 49px;
    font-size: 15px;
    color: #fff;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

</style>