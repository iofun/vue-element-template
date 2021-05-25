import { calcuMd5 } from '@/utils/libs';
import apiAuth from '@/api/auth';
import apiAccount from '@/api/auth';
import { resetRouter } from '@/router';
import {
  getUserToken,
  setUserToken,
  removeUserToken
} from '@/utils/authToken';

const getDefaultState = () => {
  return {
    token: getUserToken(),
    logged: false,
    avatar: '',
    phone: '',
    access: '',
    username: '',
    nickname: '',
    realname: ''
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, data) => {
    state.phone = data.phone;
    state.access = data.access;
    state.username = data.username;
    state.nickname = data.nickname;
    state.realname = data.realname;
  },
  SET_AVATAR: (state, data) => {
    state.avatar = data.avatar;
  },
  SET_LOGIN: (state, status) => {
    state.logged = status;
  }
};

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      apiAuth.login({ username: username.trim(), password: calcuMd5(password) }).then(response => {
        const { data } = response;
        if (data) {
          commit('SET_TOKEN', data.token);
          setUserToken(data.token);
        }
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 获取用户信息
  getAccountInfo({ commit }) {
    return new Promise((resolve, reject) => {
      apiAccount.getAccountInfo().then(response => {
        const { data } = response;
        commit('SET_USERINFO', data);
        commit('SET_AVATAR', data);
        commit('SET_LOGIN', true);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 获取验证码
  getForgetCode({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiAuth.getForgetCode(data).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 校验重置密码验证码
  verifyForgetCode({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiAuth.verifyForgetCode(data).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 重置密码
  outResetPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiAuth.outResetPassword(data).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 退出系统
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      apiAuth.logout(state.token).then(() => {
        removeUserToken(); // must remove  token  first
        resetRouter();
        commit('RESET_STATE');
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeUserToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

