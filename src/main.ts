import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from "@/store";
import client from "@/client";

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$client = client;

require('purecss/build/pure-min.css')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
