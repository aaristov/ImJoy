// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here
import vueSlider from 'vue-slider-component'

import Navbar from '@/components/Navbar'
import Imjoy from '@/components/Imjoy'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Whiteboard from '@/components/Whiteboard'
import Joy from '@/components/Joy'
import FAQ from '@/components/FAQ'
import PluginList from '@/components/PluginList'
import PluginEditor from '@/components/PluginEditor'
import FileItem from '@/components/FileItem'
import FileDialog from '@/components/FileDialog'
import store from './store.js'
import App from './App'
import VueGridLayout from 'vue-grid-layout'
import Grid from "vue-js-grid"


Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(Grid)

// register
Vue.component('vue-slider', vueSlider)
Vue.component('navbar', Navbar)
Vue.component('faq', FAQ)
Vue.component('imjoy', Imjoy)
Vue.component('main-footer', Footer)
Vue.component('about', About)
Vue.component('whiteboard', Whiteboard)
Vue.component('joy', Joy)
Vue.component('plugin-list', PluginList)
Vue.component('plugin-editor', PluginEditor)
Vue.component('file-item', FileItem)
Vue.component('file-dialog', FileDialog)
Vue.component('grid-layout', VueGridLayout.GridLayout)
Vue.component('grid-item', VueGridLayout.GridItem)

const truncate = function(text, length, clamp) {
  clamp = clamp || '...';
  const node = document.createElement('div');
  node.innerHTML = text;
  const content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', truncate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    store: store,
    router: router
  },
  template: '<App/>',
  components: {
    App
  }
})
