export default {
  addCart(context,payload) {
    // 注意要写new！！！创建一个promise对象
    return new Promise((resolve,reject)=>{
      // 1.查找之前数组中是否有该商品，如果有，赋值给oldProduct
      let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
      // 2.判断oldProduct
      if (oldProduct) {
        context.commit('addCount',oldProduct)
        resolve('现有商品数量+1')
      }
      else {
        payload.count = 1
        // payload.checked=true
        context.commit('addCart',payload)
        resolve('添加了新商品')
      }
    })
  }
}