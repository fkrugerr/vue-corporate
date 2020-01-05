import Vue from 'vue';
import Vuex from 'vuex';

import authState from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      ...authState,
    },
  },
});
