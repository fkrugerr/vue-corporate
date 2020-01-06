import Home from '../views/Home.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/corporations',
    name: 'corporations',
    component: () => import(/* webpackChunkName: "corporations" */ '../views/Corporations.vue'),
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
