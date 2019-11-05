import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.axios = axios;
//vue就是一个类，给这个类添加一个属性，就可以用属性来用axios
Vue.config.productionTip = false
Vue.filter('setWH',(url, arg)=>{
  return url.replace(/w\.h/, arg);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
