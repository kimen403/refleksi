const routes = (handler) => [
  {
    method: 'POST',
    // kategori = PENJUALAN
    // type = debit/kredit
    path: '/transaksi/{type}/{kategori}',
    handler: handler.postTransaksiHandler,
  },
  {
    method: 'GET',
    path: '/transaksi',
    handler: handler.getAllTransaksiHandler,
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
    method: 'POST',
    path: '/transaksi/penjualan',
    handler: handler.postTransaksiHandler,
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
    path: '/transaksi/kas/{type}/{kategori}',
    handler: handler.postTransaksiKasHandler,
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
    path: '/transaksi/{id}/cancel',
    handler: handler.postCancelTransaksiHandler,
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
    path: '/transaksi/{id}/detail/penjualan',
    handler: handler.getTransaksiDetailByIdHandler,
  },

  {
    method: 'GET',
    path: '/history/penjualan',
    handler: handler.getHistoryPenjualanHandler,
    options: {
      auth: 'refleksi_jwt',
      plugins: {
        hacli: {
          permissions: ['OWNER', 'MANAGER', 'ADMIN'],
        },
      },
    },
  },

];

module.exports = routes;
