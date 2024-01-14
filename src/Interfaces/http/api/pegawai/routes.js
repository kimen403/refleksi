const routes = (handler) => [
  {
    method: 'POST',
    path: '/pegawai',
    handler: handler.postPegawaiHandler,
  },

  {
    method: 'GET',
    path: '/pegawai',
    handler: handler.getAllPegawaiHandler,
  },
  {
    method: 'DELETE',
    path: '/pegawai/{id}',
    handler: handler.deletePegawaiByIdHandler,
    options: {
      auth: 'refleksi_jwt',
      plugins: {
        hacli: {
          permissions: ['OWNER', 'MANAGER'],
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/pegawai/{id}',
    handler: handler.getPegawaiByIdHandler,
  },

  {
    method: 'GET',
    path: '/history/transaksi/{id}/pegawai',
    handler: handler.getHistoryTransaksiPegawaiHandler,
  },

  // {
  //   method: 'GET',
  //   path: '/history/transaksi/{id}/pegawai',
  //   handler: handler.getPegawaiDetailByIdHandler,
  // },
];

module.exports = routes;
