import { createNamespacedHelpers } from 'vuex';
import { prop, path, pathOr } from 'rambda';

import restApi from '../../api';
import {
  set as saveToLocalStorage,
  clear as removeLocalStorageData,
  get as getStorageKey,
} from '../localStorage';
import { getUserData, getPermissions } from '../../helpers/user';

const { mapActions, mapGetters } = createNamespacedHelpers('auth');

export { mapActions, mapGetters };

const initialState = {
  userId: null,
  isAuthenticated: !!getStorageKey('loginToken'),
  data: null,
  permissions: [],
  errorMessage: null,
};

export default {
  state: {
    ...initialState,
  },
  getters: {
    isAuthorized: state => state.isAuthenticated,
    user: state => state.data,
    permissions: state => state.permissions,
    userName: state => (path('data.profile', state)
      ? `${pathOr('', 'data.profile.name', state)} ${pathOr('', 'data.profile.lastName', state)}`
      : ''),
    userEmail: state => (prop('data', state)
      ? path('data.email', state) : ''),
  },
  mutations: {
    setError(state, message) {
      state.errorMessage = message;
    },
    setUser(state, userData) {
      const { userId, email, profile, permissions } = userData;
      state.isAuthenticated = true;
      state.userId = userId;
      state.data = {
        email,
        profile,
      };
      state.permissions = permissions.length
        ? getPermissions(permissions) : [];
      state.errorMessage = null;
    },
    removeUser(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.data = null;
      state.errorMessage = null;
      state.permissions = [];
    },
  },
  actions: {
    async getUser({ commit }) {
      console.log('init');
      const userId = getStorageKey('userId');
      let res = null;
      if (userId) {
        res = await restApi(`admin/users/${userId}`);
      }
      return res && !res.error && commit('setUser', getUserData(res));
    },
    async signin({ commit, dispatch }, payload) {
      commit('setError', null);
      const result = await restApi('user/login-admin', 'post', payload);
      // console.log(result);
      if (result.error) {
        dispatch('logout');
        commit('setError', prop('message', result));
      } else {
        const userData = getUserData(result);
        console.log(userData);
        saveToLocalStorage(userData);
        commit('setUser', userData);
      }
    },
    logout({ commit }) {
      removeLocalStorageData();
      commit('removeUser');
    },
  },
};
