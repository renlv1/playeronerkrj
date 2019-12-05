/* eslint-disable no-new */
import Vue from 'vue'
import store from './vuex/store'
import { i18n } from './i18n/config'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import clipboard from 'clipboard' // 复制插件
import Validate from './plugin/validate'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import 'babel-polyfill' // 兼容ie
import App from './App'
import dialog from './components/dialog' // 弹窗
import mobHeader from './components/mobHeader' // 弹窗

// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 这个样式必须引入

// 引用请求方法,此方法将参数转换成了后台能识别的格式
import fetch from './api/api'

import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(Validate)
Vue.component('mob-header', mobHeader)

Vue.prototype.$utf16to8 = function (str) { // 二维码转码
  var out, i, len, c
  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}
axios.defaults.withCredentials = true // 存cookie

// 非中文情况下请求头加上header字段
let requestLang = localStorage.getItem('lang')
if (requestLang && requestLang.toLowerCase() !== 'cn') {
  axios.defaults.headers = {'block-chain-language': requestLang}
}

Vue.prototype.$http = axios
Vue.prototype.$fetch = fetch
Vue.prototype.$api = process.env.BASE_PATH
Vue.prototype.$dialog = dialog
Vue.prototype.Clipboard = clipboard

Vue.config.productionTip = false
// 时间戳转换
Vue.prototype.$changeDate = function (time, str = '/', type = 1) {
  function ifTime (value) { // 判断时间是否是个位数
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  let newTime = new Date(time)
  let day = newTime.getDate()
  let month = newTime.getMonth() + 1
  let year = newTime.getFullYear()
  let hours = newTime.getHours()
  let min = newTime.getMinutes()
  let sec = newTime.getSeconds()
  switch (type) {
    case 1:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min)
    case 2:
      return year + str + ifTime(month) + str + ifTime(day) + ' 00:00:00'
    case 3:
      return year + str + ifTime(month) + str + ifTime(day) + ' 23:59:59'
    case 4:
      return year + str + ifTime(month) + str + ifTime(day)
    case 5:
      return year + str + ifTime(month) + str + ifTime(day)
    case 6:
      return ifTime(hours) + ':' + ifTime(min)
    case 7:
      return ifTime(hours) + ':' + ifTime(min) + ':' + ifTime(sec)
  }
}

Vue.filter('f4', function (value) { // 保留4位小数点,不四舍五入
  if (!isNaN(value) && value !== null) {
    let f = Math.floor(value * 10000) / 10000
    let s = f.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 4) {
      s += '0'
    }
    return s
  } else {
    return '0.0000'
  }
})

// 解析奖励类型
Vue.filter('parseRewardType', (value) => {
  let lang = 'CN'
  if (window.localStorage.getItem('kleinLang')) {
    lang = window.localStorage.getItem('kleinLang')
  } else {
    lang = 'CN'
  }
  switch (value) {
    case 1:
      return i18n.vm.messages[lang].orderManage.text15
    case 2:
      return i18n.vm.messages[lang].orderManage.text16
    case 3:
      return i18n.vm.messages[lang].orderManage.text17
    case 4:
      return i18n.vm.messages[lang].orderManage.text18
    default:
      return ' '
  }
})
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})

// 进度条
NProgress.configure({
  showSpinner: false,
  minimum: 0.6,
  easing: 'ease',
  speed: 200
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  NProgress.done()
})
