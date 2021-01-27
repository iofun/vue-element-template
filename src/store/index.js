import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import app from './modules/app';
import auth from './modules/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  getters,
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
    auth
  }
});

export default store;
