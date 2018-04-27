import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import VueRouter from 'vue-router';
import 'iview/dist/styles/iview.css';
import {routes} from './routes';
import {store} from '../store/store';

Vue.use(iView);
Vue.use(VueRouter);

const router = new VueRouter({
  routes:routes,
  mode:'hash'
})



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
