// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueCookie from 'vue-cookie';
import vClickOutside from 'v-click-outside';
// import VueRouter from './router';
import Vuelidate from 'vuelidate';
import store from './store';

import router from './router/index';

Vue.use(vClickOutside)

Vue.use(VueCookie)
Vue.use(Vuelidate)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
