const routes = (handler) => [
  {
    method: 'POST',
    path: '/product',
    handler: handler.postProductsHandler,
  },
  {
    method: 'GET',
    path: '/products',
    handler: handler.getProductsHandler,
    options: {
      auth: 'refleksi_jwt',
      plugins: {
        hacli: {
          permissions: ['ADMIN', 'MANAGER', 'OWNER'],
        },
      },
    },
  },

  {
    method: 'GET',
    path: '/product/{id}',
    handler: handler.getProductsByIdHandler,

  },

  {
    method: 'GET',
    path: '/products/minstock',
    handler: handler.getMinStockHandler,
  },
  // {
  //     method: 'DELETE',
  //     path: '/threads/{threadId}/comments/{commentId}',
  //     handler: handler.deleteCommentHandler,
  //     options: {
  //         auth: 'refleksi_jwt',
  //     },
  // },
];

module.exports = routes;
