export const generateCode = () => (
  (Math.random()
    .toString(36)
    .substring(2, 5) + Math.random().toString(36).substring(2, 5)).toUpperCase()
);

export const func = val => +val;
