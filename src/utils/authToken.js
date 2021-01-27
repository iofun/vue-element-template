
import { tokenPrefix } from '@/config';
import { setCookies, getCookies, removeCookies } from '@/utils/cookies';

const TokenKey = `${tokenPrefix}_token`;

export function getUserToken() {
  return getCookies(TokenKey);
}

export function setUserToken(token) {
  return setCookies(TokenKey, token);
}

export function removeUserToken() {
  return removeCookies(TokenKey);
}
