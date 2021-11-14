import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router';
import store from './store'
import VueCookies from 'vue-cookies'
import Fragment from 'vue-fragment'

Vue.config.productionTip = false

axios.defaults.withCredentials = true;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(Fragment.Plugin)

new Vue({
  render: h => h(App),
  router,
  store,
  axios
}).$mount('#app')

