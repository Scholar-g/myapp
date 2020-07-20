import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import moment from 'moment'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import apis from './apis'
import formatters from './js/formatters'
import veeValidate from './js/veeValidate'
import './assets/less/index.less' // 自定义的icon
import BaseComponent from './components'
import lodash from 'lodash'
import common from './js/common'
import filter from './js/filters'
import echarts from 'echarts' // 全局引入引入echarts

// // 引入基本模板
// let echarts = require('echarts/lib/echarts')

// // ---start/按需引入---
// // 引入柱状图组件
// require('echarts/lib/chart/bar')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// // ---end/按需引入---

// vue全局注入echarts
Vue.prototype.$echarts = echarts

// 全局使用基础组件
Vue.use(BaseComponent)

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

// 全局使用 element-ui
Vue.use(elementUi)

// 全局使用 vee-validate
Vue.use(veeValidate, {
    locale: 'zh_CN',
    fieldsBagName: 'errorBag',
    events: 'blur|input'
})

// vue原型挂载 - 请求接口函数
Vue.prototype.$apis = apis

// vue原型挂载 - 时间格式化插件
Vue.prototype.$moment = moment

// vue原型挂载 - 初始化平台信息
Vue.prototype.$brandInfo = {
    brandId: 1,
    brandName: 'Demo集合'
}

// vue原型挂载 - 深拷贝函数
Vue.prototype.$lodash = lodash

// vue原型挂载 - 公共数据
Vue.prototype.$common = common

// vue原型挂载 - 表格数据格式化函数
const formatKeys = Object.keys(formatters)
formatKeys.forEach((item) => {
    Vue.prototype[`$${item}`] = formatters[item]
})

filter(Vue)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
