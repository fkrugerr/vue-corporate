/* eslint-disable import/prefer-default-export */
import { prop } from 'rambda';

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

export { getUserData };
