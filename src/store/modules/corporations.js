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
    isLoading: state => state.loading,
  },
  mutations: {
    setError(state, message) {
      state.errorMessage = message;
    },
    setCorporations(state, data) {
      state.data = data;
    },
    setLoading(state, val) {
      state.loading = val;
    },
  },
  actions: {
    async fetchCorporations({ commit }) {
      commit('setLoading', true);
      const res = await restApi('admin/corporations');
      if (res.error) {
        commit('setError', prop('message', res));
      } else {
        commit('setCorporations', res);
      }
      commit('setLoading', false);
    },
  },
};
