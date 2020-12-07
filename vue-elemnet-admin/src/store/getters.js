const getters = {
  language: state => state.app.language,
  token: state => state.app.token,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  roles: state => state.user.roles,
  info: state => state.user.info,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes
};

export default getters;
