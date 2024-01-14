const routes = (handler) => [
  {
    method: 'POST',
    path: '/jasa',
    handler: handler.postJasaHandler,
  },
  {
    method: 'GET',
    path: '/jasa',
    handler: handler.getJasaHandler,
  },
  {
    method: 'DELETE',
    path: '/jasa/{id}',
    handler: handler.deleteJasaHandler,
  },
];

module.exports = routes;
