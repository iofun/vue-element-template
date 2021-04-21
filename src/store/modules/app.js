import variables from '@/styles/variables.scss';
import { Cookie } from '@/utils/cookie';
import config from '@/config';

const state = {
  theme: variables.theme,
  tagsView: JSON.parse(Cookie.get('tags_view')) || false,
  fixedHeader: JSON.parse(Cookie.get('fixed_header')) || false,
  showLogo: JSON.parse(Cookie.get('sidebar_logo')) || false,
  sidebar: {
    opened: JSON.parse(Cookie.get('sidebar_open')) || false,
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
    Cookie.set(`${config.tokenPrefix}_theme`, value);
  },
  CHANGE_TAGSVIEW: (state, { key, value }) => {
    state[key] = value;
    Cookie.set(`tags_view`, value);
  },
  CHANGE_SIDEBARLOGO: (state, { key, value }) => {
    state[key] = value;
    Cookie.set(`sidebar_logo`, value);
  },
  CHANGE_HEADER: (state, { key, value }) => {
    state[key] = value;
    Cookie.set(`fixed_header`, value);
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookie.set('sidebar_open', true);
    } else {
      Cookie.set('sidebar_open', false);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookie.set('sidebar_open', false);
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
