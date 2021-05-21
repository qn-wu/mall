<template>
  <div id="detail">
      <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" 
              ref="scroll" 
              :probe-type="3"
              @scroll="detailScroll">
        <detail-swiper :top-img="topImg"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @goodsImg="goodsImg"></detail-goods-info>
        <detail-params-info :params-info="paramsInfo" ref="param"></detail-params-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <good-list :goods="recommends" ref="recommend"></good-list>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
      <!-- 监听组件要加一个.native -->
      <back-top v-show="isShowBackTop" @click.native="backToTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodList from 'components/content/goods/GoodList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getDetail,getRecommend,Goods,Shop,GoodsParams} from 'network/detail'
  import {debounce} from 'common/utils'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodList,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImg: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: [],
        recommends: [],
        themeTopY: [],
        getThemeTopY: null,
        isShowBackTop: false
      }
    },
    created() {
      // 跳转后携带的id
      this.iid = this.$route.params.iid

      // 1.请求详情数据
      getDetail(this.iid).then(res=>{
        const data=res.result
        // 1.获取详情页的轮播图数据
        this.topImg = data.itemInfo.topImages

        // 2.获取商品基本信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo;

        // 5.获取商品参数
        this.paramsInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)

        // 6.获取评价信息
        if (data.rate.cRate) {
          this.commentInfo = data.rate.list
        }
      })
      // 2.请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list
      })

      // 3.请求完数据后，获取对应标题的offsetTop
      this.getThemeTopY = debounce(()=>{
        this.themeTopY=[]
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE) //为了实现'滚动到一定内容时标题高亮'这个功能循环时会用到这个值
      },500)
  },
  methods: {
    // 图片加载完后的处理函数
    goodsImg() {
      this.$refs.scroll.refresh() //图片加载完后重新计算高度
      this.getThemeTopY() //图片加载完后获取各标题的offsetTop
    },

    // 1.点击标题跳转到对应位置
    titleClick(index) { 
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],500)
    },

    detailScroll(position) {
      // 2.滚动到一定内容时标题高亮
      const posY = -position.y
      const lens = this.themeTopY.length
      for (let i=0;i<lens-1;i++) {
        if (posY>=this.themeTopY[i] && posY<this.themeTopY[i+1]) {
          this.$refs.nav.currentIndex=i
        }
      }

      // 是否显示返回顶部图标
      this.isShowBackTop = posY>700
    },

    // 返回顶部
    backToTop() {
      this.$refs.scroll.scrollTo(0,0)
    },

    addToCart() {
      // 1.获取购物车界面要显示的数据
      const product={}
      product.iid=this.iid
      product.img=this.topImg[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.nowPrice
      // 2.将数据保存到vuex中
      this.$store.dispatch('addCart',product).then(res=>{
        this.$toast.show(res,2000)
      })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    overflow: hidden;
    /* 上下左右必须都指定 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
