<template>
  <div class="comment-info" v-if="commentInfo.length != 0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i> > </i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo[0].user.avatar" alt="">
      <span> {{commentInfo[0].user.uname}} </span>
    </div>
    <div class="info-detail">
      <p> {{commentInfo[0].content}} </p>
      <div class="info-other">
        <span class="date"> {{commentInfo[0].created | showTime}} </span>
        <span> {{commentInfo[0].style}} </span>
      </div>
      <div class="info-img">
        <img v-for="item in commentInfo[0].images" :src="item" :key="item.acm">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      tpye: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    showTime(value) {
      // 1.将时间戳转成Date对象，时间戳是以s为单位的
      const date=new Date(value*1000)
      // 2.date格式化
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    margin-left: 10px;
    position: relative;
    top: -15px;
    font-size: 15px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-img img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>