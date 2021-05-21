<template>
  <div id="cart">
    <nav-bar class="nav-bar"> <div slot="center">购物车({{cartListLength}})</div> </nav-bar>
    <scroll class="content">
      <cart-list :cart-list="cartList"></cart-list>
    </scroll>
    <cart-bottom-bar :cart-list="cartList"></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
 
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottomBar
    },
    computed: {
      //Getters里的操作对应的是computed，所以这一步要在computed中完成。如果是Actions，则在methods中
      ...mapGetters(['cartListLength','cartList'])
    }
    
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
    position: relative;
    background-color: #fff;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 93px;

  }
</style>
