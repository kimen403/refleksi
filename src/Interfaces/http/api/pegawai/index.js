const routes = require('./routes');
const PegawaiHandler = require('./handler');

module.exports = {
  name: 'pegawai',
  version: '1.0.0',
  register: async (server, { container }) => {
    const pegawaiHandler = new PegawaiHandler(container);
    server.route(routes(pegawaiHandler));
  },
};
