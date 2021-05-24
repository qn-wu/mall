<template>
  <div id="category">
    <nav-bar class="category-nav"> <div slot="center">商品分类</div> </nav-bar>
    <div class="content">
      <tab-menu class="tab-menu" :category="category" @selectItem="selectItem"></tab-menu>
      <scroll class="scroll">
        <tab-content-list class="content-list" :subcontent="showSubContent"></tab-content-list>
        <tab-control class="tab-control" 
                      :titles="['综合','新品','热销']"
                      @tabClick="tabClick"
                      ref="tabcontrol"></tab-control>
        <good-list class="content-detail" :goods="showSubDetail"></good-list>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodList'

  import TabMenu from './childComps/TabMenu'
  import TabContentList from './childComps/TabContentList'
  
  import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
 
  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodList,
      TabMenu,
      TabContentList
    },
    data() {
      return {
        category: [],
        categoryData: [],
        currentIndex: -1,
        currentType: 'pop'
      }
    },
    created() {
      this._getCategory()
    },
    computed: {
      showSubContent() {
        if (this.currentIndex==-1) return []
        return this.categoryData[this.currentIndex].subContent
      },
      showSubDetail() {
        if (this.currentIndex==-1) return []
        return this.categoryData[this.currentIndex].subDetail[this.currentType]
      }
    },
    methods: {
      //1.请求category数据
      _getCategory() {
        getCategory().then(res=>{
          this.category=res.data.category.list
          //初始化并获得每个子分类数据
          for (let i=0;i<this.category.length;i++) {
            this.categoryData[i]={
              'subContent': [], //content数据
              'subDetail': {  //content数据
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          //先请求“正在流行”该分类下的数据
          this._getSubcategory(0)
        })
      },
      //2.请求content数据
      _getSubcategory(index) {
        this.currentIndex=index
        const maitKey=this.category[index].maitKey
        getSubcategory(maitKey).then(res=>{
          this.categoryData[index].subContent=res.data.list
          this.categoryData=[...this.categoryData]
          this._getCategoryDetail(index,'pop')
          this._getCategoryDetail(index,'new')
          this._getCategoryDetail(index,'sell')
        })
      },
      //3.请求content detail数据
      _getCategoryDetail(index,type) {
        const miniWallkey=this.category[index].miniWallkey
        getCategoryDetail(miniWallkey,type).then(res=>{
          this.categoryData[index].subDetail[type]=res
          this.categoryData=[...this.categoryData]
        }) 
      },

      //1.左侧menu点击事件的响应
      selectItem(index) {
        this._getSubcategory(index)
      },
      //2.右侧tabcontrol点击事件的响应
      tabClick(index) {
        switch(index) {
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
      }
    }
  }
</script>

<style scoped>
  #category {
    position: relative;
    height: 100vh;
  }

  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-menu {
    width: 100px;
    float: left;
  }

  .scroll {
    margin-left: 108px;
    margin-right: 8px;
    width: 100%-100px;
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    margin-top: 20px;
  }
</style>
