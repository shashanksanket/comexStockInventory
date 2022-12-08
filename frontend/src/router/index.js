import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import yicroutes from './routes/yicroutes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    // { path: '/', redirect: { name: 'dashboard-ecommerce' } },
    { path: '/', redirect: { name: 'Dashboard' } },
    ...yicroutes,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach(async (to, _, next) => {
let isLoggedIn = router.app.$store.getters['auth/isAuthenticated']
if (!isLoggedIn){
  await router.app.$store.dispatch('auth/loginUserWithJwt')
  isLoggedIn = router.app.$store.getters['auth/isAuthenticated']
}
if (!to.meta.authReq){
  return next()
}
if(!isLoggedIn){
  return next({name: 'login'})
}
if (!to.meta.authReq && isLoggedIn){
  return next({name:'Dashboard'})
}
if (isLoggedIn && to.meta.authReq){
  return next()
}


if(!isLoggedIn && to.meta.authReq){
  return next({name: 'login'})
}
  
  
  return next()
})

//   let token = localStorage.getItem('feathers-jwt')
//   const isLoggedIn = router.app.$store.getters['login/isAuthenticated']
//   if(to.name != 'auth-login' && !token) {
//     return next({ name: 'auth-login' })
//   }else {  return next() }
//   // return next()
// })

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
