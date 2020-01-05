import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      guest: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const hasToken = store.state.auth.isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (hasToken) {
      next();
    } else {
      next({
        name: 'login',
      });
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (hasToken) {
      next({
        name: 'home',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
