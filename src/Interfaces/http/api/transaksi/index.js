const TransaksiHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'transaksi',
  version: '1.0.0',
  register: async (server, { container }) => {
    const transaksiHandler = new TransaksiHandler(container);
    server.route(routes(transaksiHandler));
  },
};
