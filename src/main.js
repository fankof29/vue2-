// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods.vue';
import seller from './components/seller/seller.vue';
import ratings from './components/ratings/ratings.vue';
import 'common/stylus/index.styl';
Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [{path: '/', component: goods}, {path: '/goods', component: goods}, {path: '/ratings', component: ratings}, {path: '/seller', component: seller}];
const router = new VueRouter({routes, linkActiveClass: 'active'});
/* eslint-disable no-new */
new Vue({template: '<App/>', router, components: {App}}).$mount('#app');

router.push('/goods');

