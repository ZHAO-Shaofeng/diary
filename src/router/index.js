import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import info from '@/pages/info'
import write from '@/pages/write'

Vue.use(Router)

export default new Router({
  routes: [
	  {
	  	path: '/', 
	  	redirect: '/home'
	  },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'info',
          component: info
        },
        {
          path: 'write',
          component: write
        }
      ]
    },
  ]
})
