import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import routes from './routes';

Vue.use(VueRouter);

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
