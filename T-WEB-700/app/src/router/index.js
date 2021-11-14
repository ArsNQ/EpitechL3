import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Register from "../views/Register";
import SignIn from '../views/SignIn.vue'
import Administration from "../views/Administration";
import User from "../views/User";
/*import store from "@/store/store";*/

Vue.use(VueRouter)

const routes = [
  { path: '/',
    component: Home
  },
  {
    path: '/signIn',
    component: SignIn
  },
  {
    path: '/profile',
    component: Profile,
   meta:{
     requiresAuth:true
   }
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/admin',
    component: Administration
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

/*router.beforeEach((to, from, next) => {
  if (store.getters["user/signIn"].isConnected === false ) return next("/Profile");
  if (store.getters["user/signIn"].isConnected === 'Profile' ) return next("/Home");
  return next();
});*/

export default router
