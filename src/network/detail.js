// 封装 详情页的网络请求
import {request} from './request'

// 1.请求详情数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 2.请求推荐信息
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 将杂乱无章的数据放在一个类中
// 1.商品基本信息
export class Goods {
  constructor(itemInfo,columns,services) {
    this.title=itemInfo.title
    this.oldPrice=itemInfo.oldPrice
    this.newPrice=itemInfo.price
    this.desc=itemInfo.discountDesc
    this.columns=columns
    this.services=services
    this.nowPrice=itemInfo.highNowPrice
  }
}

// 2.店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo=shopInfo.shopLogo
    this.name=shopInfo.name
    this.sells=shopInfo.cSells
    this.fans=shopInfo.cFans
    this.goodsCount=shopInfo.cGoods
    this.score=shopInfo.score
  }
}

// 3.商品参数信息
export class GoodsParams {
  constructor(info,rule) {
    this.img=info.images ? info.images[0] : '' //有些商品有images，有些没有
    this.infos=info.set
    this.sizes=rule.tables
  }
}