import { createNamespacedHelpers } from 'vuex';
import { prop } from 'rambda';

import restApi from '../../api';

const { mapActions, mapGetters } = createNamespacedHelpers('corporations');

export { mapActions, mapGetters };

const initialState = {
  data: [],
  errorMessage: null,
  loading: false,
};

export default {
  state: {
    ...initialState,
  },
  getters: {
    corporations: state => state.data,
  },
  mutations: {
    setError(state, message) {
      state.errorMessage = message;
    },
    setCorporations(state, data) {
      state.data = data;
    },
  },
  actions: {
    async fetchCorporations({ commit }) {
      const res = await restApi('admin/corporations');
      if (res.error) {
        commit('setError', prop('message', res));
      } else {
        commit('setCorporations', res);
      }
    },
  },
};
