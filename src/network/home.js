//封装 首页的网络请求 都放在这里，方便管理
import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) { //type:流行/新款/精选 page:第几页数据
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}