<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  // 定义这些props是因为，并不是所有的页面都需要这些数据，所以将其暴露给各个页面，自行设置
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1. 创建BScroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      observeDOM: true, //有了这一句才能滑动
      click: true, //有了这一句才能点击
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2. 监听滚动的位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
    }
    // 3. 监听是否滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }

  },
  methods: {
    scrollTo(x,y,time=500) { //x,y是坐标，time是多少时间内滑回去
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }

  }
}
</script>

<style scoped>

</style>