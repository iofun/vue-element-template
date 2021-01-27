import { resetRouter } from '@/router';
import { getUserToken, setUserToken, removeUserToken } from '@/utils/authToken';
import apiAuth from '@/api/auth';

const getDefaultState = () => {
  return {
    token: getUserToken(),
    username: '',
    nickname: '',
    avatar: ''
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
  SET_NAME: (state, data) => {
    state.username = data.username;
    state.nickname = data.nickname;
  },
  SET_AVATAR: (state, data) => {
    state.avatar = data.avatar;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      apiAuth.login({ username: username.trim(), password: password }).then(response => {
        const { data } = response;
        commit('SET_TOKEN', data.token);
        setUserToken(data.token);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      apiAuth.getInfo(state.token).then(response => {
        const { data } = response;
        if (!data) {
          return reject('验证失败，请重新登录。');
        }
        commit('SET_NAME', data);
        commit('SET_AVATAR', data);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user logout
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

  // remove token
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

