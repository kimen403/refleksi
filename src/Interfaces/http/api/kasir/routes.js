const routes = (handler) => [
  {
    method: 'GET',
    path: '/kasir/me',
    handler: handler.getKasirByIdHandler,
    options: {
      auth: 'refleksi_jwt',
    },
  },
  {
    method: 'POST',
    path: '/kasir/open',
    handler: handler.postOpenKasirHandler,
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
    method: 'POST',
    path: '/kasir/close',
    handler: handler.postCloseKasirHandler,
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
    method: 'GET',
    path: '/kasir/history',
    handler: handler.getHistoryKasirHandler,
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
    method: 'POST',
    path: '/kasir/debit',
    handler: handler.postKasDebitHandler,
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
    method: 'POST',
    path: '/kasir/out',
    handler: handler.postKasOutHandler,
    options: {
      auth: 'refleksi_jwt',
      plugins: {
        hacli: {
          permissions: ['OWNER', 'MANAGER', 'ADMIN'],
        },
      },
    },
  },
  // {
  //     method: 'DELETE',
  //     path: '/threads/{threadId}/comments/{commentId}',
  //     handler: handler.deleteCommentHandler,
  //     options: {
  //         auth: 'forumapi_jwt',
  //     },
  // },
];

module.exports = routes;
