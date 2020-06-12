import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Tab, Tabs,IndexBar,IndexAnchor,Cell,CellGroup } from 'vant';
// 引入所有样式
import "@/common/less/index.less"

Vue.config.productionTip = false
Vue.use(Tab).use(Tabs).use(IndexBar).use(IndexAnchor).use(Cell).use(CellGroup);

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
