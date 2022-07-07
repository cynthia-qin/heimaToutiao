import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import '@/styles/index.less'
// 全局注册组件
import MyIcon from '@/components/MyIcon.vue'

// 将filters文件夹下的index.js文件里的所有按需导出的内容导出  作为obj的属性(默认导出的名字是obj的属性名，值是对应的属性值)
import * as obj from '@/filters'

// 引入全局注册的组件
import '@/components'

// 全局注册关注组件
import FollowUser from '@/components/FollowUser.vue'
// Object.keys(对象) 可以获取这个对象里的所有属性名，并返回一个数组
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component(FollowUser.name, FollowUser)

Vue.component('MyIcon', MyIcon)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// eslint-disable-next-line no-var
var a = 1
