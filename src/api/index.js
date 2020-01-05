import axios from 'axios';
import { find, includes, path, pathOr } from 'rambda';

import { get, clear } from '../store/localStorage';

const guestRoutes = [
  '/user/reset-password/',
  '/user/login-admin',
  '/user/forgot-password',
];

const API = axios.create({
  baseURL: process.env.VUE_APP_REST_API_URL,
});

API.interceptors.request.use(config => ({
  ...config,
  headers: {
    Authorization: `Bearer ${get('loginToken')}`,
  },
}),
error => (Promise.reject(error)));

API.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 403) {
      const isGuestRoute = find(
        item => includes(item, path('config.url', error)),
        guestRoutes,
      );
      if (!isGuestRoute) {
        clear();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    }
    return Promise.reject(error);
  },
);

export default async (endpoint, method = 'get', payload, params = {
}) => {
  const config = {
    method,
    url: endpoint,
    params: {
      ...params,
    },
    ...(payload ? {
      data: payload,
    } : {
    }),
  };
  try {
    const response = await API(config);
    if (response.status === 200) {
      return response.data;
    }
    const errorObj = {
      status: response.status,
      response,
    };
    throw errorObj;
  } catch (error) {
    const message = pathOr('API error', 'response.data.error', error);
    return {
      error: true,
      message,
    };
  }
};
