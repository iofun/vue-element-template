const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.auth.token,
  logged: state => state.auth.logged,
  avatar: state => state.auth.avatar,
  access: state => state.auth.access,
  phone: state => state.auth.phone,
  username: state => state.auth.username,
  nickname: state => state.auth.nickname,
  realname: state => state.auth.realname,
  loading: state => state.app.loading,
  settings: state => state.app.settings,
  showLogo: state => state.app.showLogo,
  fixedHeader: state => state.app.fixedHeader
};
export default getters;
