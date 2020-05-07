// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'ant-design-vue/dist/antd.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import G2 from '@antv/g2'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'
import './components/custom.less'
import './utils/flexible.js'

import { getFlexibleSize } from './utils/util'
Vue.config.productionTip = false

Vue.prototype.$flexible = getFlexibleSize
Vue.prototype.$eventHub = new Vue()
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(G2)

Vue.prototype.numFilter = function (value) {
  let realVal = ''
  if (!isNaN(value) && value !== '') {
    // 截取当前数据到小数点后两位
    realVal = parseFloat(value).toFixed(4)
  } else {
    realVal = value
  }
  return realVal
}
new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
