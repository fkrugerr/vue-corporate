/* eslint-disable import/prefer-default-export */
import { prop, includes, reject, concat } from 'rambda';

const getUserData = (user) => {
  const { data: { _id, email, profile, role }, token } = user;
  return {
    userId: _id,
    email,
    profile,
    permissions: prop('permissions', role),
    loginToken: token,
  };
};

const staticPermissions = [
  {
    _id: '991',
    name: 'Companies',
    path: {
      web: 'companies/page/1',
    },
  },
  {
    _id: '992',
    name: 'Promo Codes',
    path: {
      web: 'promo-codes',
    },
  },
  {
    _id: '993',
    name: 'Corporations',
    path: {
      web: 'corporations',
    },
  },
];

const rejectNames = item => includes(prop('name', item), ['Tiers', 'Companies']);

const getPermissions = arr => (
  concat(reject(rejectNames, arr), staticPermissions)
);

export { getUserData, getPermissions };
