<template>
  <div class="list-item">
    <check-button :value="itemInfo.checked" @changeCheck="checkChange"></check-button>
    <div class="item-img">
      <img :src="itemInfo.img" alt="">
    </div>
    <div class="item-info">
      <div class="item-title"> {{itemInfo.title}} </div>
      <div class="item-desc"> {{itemInfo.desc}} </div>
      <div class="item-other">
        <div class="item-price"> ￥{{itemInfo.price}} </div>
        <div class="item-count"> x{{itemInfo.count}} </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkChange() {
      this.itemInfo.checked=!this.itemInfo.checked
    }
  }
}
</script>

<style scoped>
  .list-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    padding: 5px 10px;
    /* item-other的子绝父相 */
    position: relative;
    overflow: hidden;
    font-size: 17px;
    color: #333;
  }

  .item-title, .item-desc {
    overflow: hidden;
    /* 文本不换行 */
    white-space: nowrap;
    /* 使用省略号代表被修剪的文本 */
    text-overflow: ellipsis;
  }

  .item-desc {
    margin-top: 15px;
    font-size: 14px;
    color: #666;
  }

  .item-other {
    margin-top: 10px;
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

  .item-price {
    float: left;
    color: orangered;
  }

  .item-count {
    float: right;
  }

</style>