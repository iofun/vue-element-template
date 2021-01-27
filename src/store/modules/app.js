import variables from '@/styles/variables.scss';
import { setCookies, getCookies } from '@/utils/cookies';
import config from '@/config';

const state = {
  theme: variables.theme,
  tagsView: JSON.parse(getCookies('tags_view')) || false,
  fixedHeader: JSON.parse(getCookies('fixed_header')) || false,
  showLogo: JSON.parse(getCookies('sidebar_logo')) || false,
  sidebar: {
    opened: JSON.parse(getCookies('sidebar_open')) || false,
    withoutAnimation: false
  },
  loading: false,
  settings: false,
  device: 'desktop'
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  CHANGE_THEME: (state, { key, value }) => {
    state[key] = value;
    setCookies(`${config.tokenPrefix}_theme`, value);
  },
  CHANGE_TAGSVIEW: (state, { key, value }) => {
    state[key] = value;
    setCookies(`tags_view`, value);
  },
  CHANGE_SIDEBARLOGO: (state, { key, value }) => {
    state[key] = value;
    setCookies(`sidebar_logo`, value);
  },
  CHANGE_HEADER: (state, { key, value }) => {
    state[key] = value;
    setCookies(`fixed_header`, value);
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      setCookies('sidebar_open', true);
    } else {
      setCookies('sidebar_open', false);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    setCookies('sidebar_open', false);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  API_LOADING: state => {
    state.loading = !state.loading;
  },
  TOGGLE_SETTINGS: state => {
    state.settings = !state.settings;
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  },
  changeTheme({ commit }, data) {
    commit('CHANGE_THEME', data);
  },
  changeTagsView({ commit }, data) {
    commit('CHANGE_TAGSVIEW', data);
  },
  changeSidebarLogo({ commit }, data) {
    commit('CHANGE_SIDEBARLOGO', data);
  },
  changeHeader({ commit }, data) {
    commit('CHANGE_HEADER', data);
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  apiLoading({ commit }) {
    commit('API_LOADING');
  },
  toggleSettings({ commit }) {
    commit('TOGGLE_SETTINGS');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
