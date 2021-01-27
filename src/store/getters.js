const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.auth.token,
  avatar: state => state.auth.avatar,
  username: state => state.auth.username,
  nickname: state => state.auth.nickname,
  loading: state => state.app.loading,
  settings: state => state.app.settings,
  showLogo: state => state.app.showLogo,
  fixedHeader: state => state.app.fixedHeader
};
export default getters;
