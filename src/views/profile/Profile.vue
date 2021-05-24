<template>
  <div id="profile">
    <!-- part1 -->
    <nav-bar class="nav-bar"> <div slot="center"> 购物街 </div> </nav-bar>
    <!-- part2 -->
    <user-info></user-info>
    <!-- part3 -->
    <div class="banner">
      <div class="banner-item">
        <div>
          <span class="count">0.00</span>元
        </div>
        <div class="info">我的余额</div>
      </div>
      <div class="banner-item">
        <div>
          <span class="count">0</span>个
        </div>
        <div class="info">我的优惠</div>
      </div>
      <div class="banner-item">
        <div>
          <span class="count">0</span>分
        </div>
        <div class="info">我的积分</div>
      </div>
    </div>
    <!-- part4 -->
    <list-view class="list-view" :datas="orderList"></list-view>
    <list-view class="list-view" :datas="serviceList"></list-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'  

  import ListView from './childComps/ListView'
  import UserInfo from './childComps/UserInfo'

  export default {
    name: "Profile",
    components: {
      NavBar,
      ListView,
      UserInfo
    },
    data() {
      return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198',info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53',info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636',info: '会员卡'}
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198',info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198',info: '下载购物APP'}
        ]
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .banner {
    display: flex;
    font-size: 13px;
    color: #666;
  }
  .banner-item {
    width: 100%;
    padding: 18px;
    text-align: center;
    background-color: #fff;
    margin-right: 1px;
  }
  /* 指定父元素最后一个banner-item的格式 */
  .banner-item:last-of-type {
    margin-right: 0;
  }
  .count {
    color: var(--color-high-text);
    font-size: 24px;
    font-weight: 700;
  }
  .info {
    margin-top: 6px;
  }

  .list-view {
    margin-top: 10px;
  }
</style>
