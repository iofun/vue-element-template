import Cookies from 'js-cookie';

export const Cookie = {
  set: (key, value, opt = {}) => {
    const other = Object.assign({}, opt);
    Cookies.set(key, value, other);
  },
  get: (key, opt = {}) => {
    const _key = Cookies.get(key, opt);
    if (_key) return _key;
    else return false;
  },
  remove: (key, opt = {}) => {
    return Cookies.remove(key, opt);
  }
};
