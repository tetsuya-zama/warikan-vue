// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Framework7 from 'framework7/dist/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js'
import Framework7Styles from 'framework7/dist/css/framework7.css'

Vue.use(Framework7Vue, Framework7)
Vue.config.productionTip = false

/* eslint-disable no-new */
/**
 * main.jsで行うのはframework7の設定と
 * メインコンポーネント(App.vue)のロードのみ
 * メインロジックはApp.vueを参照
 **/
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  framework7: {
    id: 'jp.co.nri-st.warikan', 
    name: 'warikan',
    routes:[]
  }
})
