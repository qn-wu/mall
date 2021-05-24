// 封装 分类页的网络请求
import {request} from './request'

// 请求数据
//1.menu
export function getCategory() {
  return request({
    url: '/category'
  })
}

//2.content
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

//3.content detail
export function getCategoryDetail(miniWallkey,type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}