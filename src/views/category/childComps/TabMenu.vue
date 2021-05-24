<template>
  <div class="tab-menu">
    <scroll class="menu-list">
      <div class="list-item"
            v-for="(item,index) in category" 
            :key="(item,index).acm"
            @click="itemClick(index)"
            :class="{active: currentIndex==index}">
        {{item.title}}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'TabMenu',
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    category: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex=index
      this.$emit('selectItem',index)
    }
  }
}
</script>

<style scoped>
  .tab-menu {
    width: 100px;
    height: 100vh;
    position: relative;
    /* 并排放置两个带边框的框 */
    box-sizing: border-box;
    background-color: #f6f6f6;
  }

  .menu-list {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 94px;
    left: 0;
    right: 0;
  }

  .list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .list-item.active {
    border-left: 3px solid var(--color-tint);
    color: var(--color-high-text);
    font-weight: 700;
    background-color: #fff;
  }
</style>