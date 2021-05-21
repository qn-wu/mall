<template>
  <div class="bottom-bar">
    <check-button class="select-all" 
                  v-model="isAll"
                  @changeCheck="checkChange"></check-button>
    <span>全选</span>
    <span class="total-price">合计:{{totalPrice}}</span>
    <span class="to-buy" @click="toBuy">去支付{{totalCount}}</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name: 'CartBottomBar',
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    CheckButton
  },
  computed: {
    isAll() {
      return this.cartList.find(item=>item.checked==false) == undefined
    },
    totalPrice() {
      return '￥' + this.cartList.filter(item=>{
                                    return item.checked==true
                                  }).reduce((preValue,item)=>{
                                      return preValue+item.price*item.count
                                    },0).toFixed(2)
    },
    totalCount() {
      return '(' + this.cartList.filter(item=>{
                                    return item.checked==true
                                    }).reduce((preValue,item)=>{
                                      return preValue+item.count
                                    },0) + ')'
                                  
    }
  },
  methods: {
    checkChange() {
      let isSelectAll=this.cartList.find(item=>item.checked==false)
      //点击按钮，如果有的item的checked==false,即isSelectAll不为空，则将所有item的checked改成true；
      //如果所有的item的checked都是true，则全改成false
      if (isSelectAll) {
        this.cartList.forEach(item=>{
          item.checked=true
        })
      }
      else {
        this.cartList.forEach(item=>{
          item.checked=false
        })
      }
    },
    toBuy() {
      let isSelect = this.cartList.filter(item=>item.checked==true) 
      if (isSelect.length==0) {
        this.$toast.show('请选择要购买的商品')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    padding-left: 35px;
    font-size: 14px;
    color: #888;
    line-height: 44px;
    background-color: #eee;
    box-shadow: 0 -2px 3px rgba(0,0,0,.2);
    /* 放置两个并排的带边框的框 */
    box-sizing: border-box;
  }

  .select-all {
    position: absolute;
    top: 20px;
    left: 12px;
    line-height: 0;
  }

  .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .to-buy {
    float: right;
    width: 100px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background-color: var(--color-tint);
  }
</style>