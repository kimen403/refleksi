const routes = (handler) => ([
  {
    method: 'POST',
    path: '/login',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/auth',
    handler: handler.putAuthenticationHandler,
    options: {
      auth: 'refleksi_jwt',
      plugins: {
        hacli: {
          permissions: ['OWNER', 'MANAGER', 'ADMIN'],
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/logout',
    handler: handler.deleteAuthenticationHandler,
  },

]);

module.exports = routes;
