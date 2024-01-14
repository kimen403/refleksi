const routes = (handler) => ([
  {
    method: 'POST',
    path: '/admin',
    handler: handler.postAdminHandler,
  },
]);

module.exports = routes;
