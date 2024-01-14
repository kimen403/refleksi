const routes = require('./routes');
const KasirHandler = require('./handler');

module.exports = {
  name: 'Kasir',
  version: '1.0.0',
  register: async (server, { container }) => {
    const kasirHandler = new KasirHandler(container);
    server.route(routes(kasirHandler));
  },
};
