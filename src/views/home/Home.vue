<template>
  <div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div> </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick"
                    ref="tabcontrol1"
                    class="tab-control1"
                    v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-recommend></feature-recommend>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick"
                    ref="tabcontrol2"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'   //导航
  import TabControl from 'components/content/tabControl/TabControl' //推荐产品列表
  import GoodList from 'components/content/goods/GoodList' //展示商品
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'       //轮播图
  import HomeRecommend from './childComps/HomeRecommend' //推荐
  import FeatureRecommend from './childComps/FeatureRecommend' //本周流行

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop,
      HomeSwiper,
      HomeRecommend,
      FeatureRecommend
    },
    data() {
      return {
        //banners和recommends保存网络请求回来的数据,轮播图数据和推荐数据
        banners:[],
        recommends:[],
        goods: { //存放首页下面推荐的商品数据
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false, //是否显示回到顶部图标
        tabOffsetTop: 0, //tabControl的偏移量
        isTabFixed: false, //tabControl是否吸顶
        saveY: 0 //离开时的位置信息
      }
    },
    activated() {
      // 注意这里先刷新再跳转，不然不起作用
      this.$refs.scroll.refresh() 
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    //发送网络请求后立即写生命周期函数
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata()
      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 3. 图片加载完的事件监听，不能放在created里，那样就会是undefined。放在created里的生命周期决定了其中的东西必须有个data来保存
      // refresh是局部变量，但下面的箭头函数是一个闭包，对外层的refresh做了引用，所以它不会销毁
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImgLoad',()=>{
        refresh()
      })
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /* 事件点击的相关方法 */
      // 1. tabControl的流行、新款、精选之间的切换
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        this.$refs.tabcontrol2.currentIndex=index
        this.$refs.tabcontrol1.currentIndex=index
      },
      // 2. 点击返回顶部
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // 1. 返回顶部图标是否显示
        this.isShowBackTop= (-position.y) > 700 //注意这里只拿y轴的数据，同时由于坐标轴是朝下的所以是负的

        // 2. 判断tabControl的偏移与滑动距离的关系，确定isTabFixed的值
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        
      },
      // 3. 上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      // 4. 轮播图加载出来了，为了tabControl吸顶开始计算offsetTop
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      },

      /* 网络请求的相关方法 */
      // 1. 请求banner和recommend数据
      getHomeMultidata() {
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })                  
      },
      // 2. 请求商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* 高度与手机屏幕相等 */
    height: 100vh;
    /* 这个相对定位是为了.content，子绝父相 */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    overflow: hidden;
    /* 以下都是为了指定content的高度，但上下左右必须都指定 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control1 {
    position: relative;
    z-index: 10;
  }

</style>
