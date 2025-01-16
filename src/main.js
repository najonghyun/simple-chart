import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/bootstrap.css'
import { registerChart } from '@mescius/wijmo.vue2.chart'
import { registerChartAnimation } from '@mescius/wijmo.vue2.chart.animation'
import '@mescius/wijmo.styles/wijmo.css'
import './assets/css/wijmo.css'
import './assets/fonts/index.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
registerChart(Vue)
registerChartAnimation(Vue)

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
