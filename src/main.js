import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import VueRouter from 'vue-router'

import modal from "vue-js-modal"

Vue.config.productionTip = false;
Vue.use(modal, { dialog: true, dynamic: true });
Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    render: h => h(App),
    store,

    el: '#app',

    template: '<App/>',
    components: { App },
    router

}).$mount('#app');