import Toast from './Toast.vue'

//这里的obj对应的是main.js中的toast。这个obj名字可以随便取，不用与toast对应起来
const obj={}
//main.js中的use对应执行obj.install，并且执行use会将Vue传过来
obj.install=function(Vue) {
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.根据组件构造器，用new的方式，创建出来一个组件对象
  const toast = new toastConstructor()
  //3.将组件对象手动挂载到一个元素div上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  //在原型中添加toast对象
  Vue.prototype.$toast = toast
}

export default obj