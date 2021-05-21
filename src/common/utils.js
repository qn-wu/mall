// 防抖
export function debounce(func,delay) {
  // timer是局部变量，但下面的function是一个闭包，闭包对外层的东西做了引用，外层的东西不会销毁
  let timer=null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

// 时间格式化
export function formatDate(date, fmt) {
  // 获取年
  // +：表示1位或多位；*：表示0位或多位；?：表示0位或1位
  if (/(y+)/.test(fmt)) { //test用来检测字符串是否匹配某种格式
    // date.getFullYear() + ''：转化成字符串，数字+字符串：得到一个字符串。如现在：'2021'
    // 假设RegExp.$1传入的是2021，则substr(0)，字符串'2021'截掉0位，用字符串'2021'替代fmt；假设传入的是21，则substr(2)，截掉'2021'的前两位，用字符串'21'替代fmt
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 获取其他时间
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 这个函数是为了：如果得到的是个位数，如4:4:4，前面加0
function padLeftZero(str) {
  // 如果是4，str.length=1,'004'截掉一个0，返回04；如果是14，str.length=2，'0014'截掉前两位两个0
  return ('00'+str).substr(str.length)
}