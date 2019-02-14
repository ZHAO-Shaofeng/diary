// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import materialize from 'materialize-css'
import 'material-design-icons/iconfont/material-icons.css'
import EXIF from 'exif-js'

Vue.config.productionTip = false

// Vue.use(materialize);
Vue.prototype.$materialize = materialize
Vue.prototype.$EXIF = EXIF

sessionStorage.clear();

router.beforeEach((to, from, next) => {
  if (to.path == '/!') {
  	router.push('/home');
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
