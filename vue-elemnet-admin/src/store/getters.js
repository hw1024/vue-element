const getters = {
  language: state => state.app.language,
  token: state => state.app.token,
  roles: state => state.user.roles,
  info: state => state.user.info,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes
};

export default getters;
