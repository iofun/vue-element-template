
import { tokenPrefix } from '@/config';
import { Cookie } from '@/utils/cookie';

const TokenKey = `${tokenPrefix}_token`;

export function getUserToken() {
  return Cookie.get(TokenKey);
}

export function setUserToken(token) {
  return Cookie.set(TokenKey, token);
}

export function removeUserToken() {
  return Cookie.remove(TokenKey);
}
