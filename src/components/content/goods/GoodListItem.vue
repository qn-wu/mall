<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImg" :key="showImg" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.orgPrice}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 判断数据中的图片位于哪种格式，并显示图片
    showImg() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    // 监听图片加载
    imgLoad() {
      this.$bus.$emit('itemImgLoad') //这个itemImgLoad也是随便取的，就是为了传一个事件到事件总线中
    },
    // 监听点击item，跳转到详情页
    itemClick() {
      this.$router.push('/detail/'+this.goodsItem.iid)
    },
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    /* 每个good-item占屏幕的48% */
    width: 48%; 
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
  }

  .goods-info p {
    margin-bottom: 3px;
    /* 显示省略号来替代省略掉的文本 */
    text-overflow: ellipsis;
    /* 元素内的空白：nowrap文本不会换行，直到遇到br标签为止 */
    white-space: nowrap;
  }

  .goods-info .price {
    margin-right: 20px;
    color: var(--color-high-text);
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    /* 第一个数字0表示背景颜色；0/14px中，0是background-position的属性简写，14px是background-size的属性简写 */
    background: url('~assets/img/common/collect.svg') 0 0/14px;
  }

</style>