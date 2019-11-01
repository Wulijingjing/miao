import Vue from 'vue'
import VueRouter from 'vue-router'
import cinemaRouter from './cinema'
import movieRouter from './movie'
import mineRouter from './mine'
Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
	  cinemaRouter,
      mineRouter,
      movieRouter,
      {
          path: '/*',
          redirect: '/movie'
      }
  ]
});

export default router
