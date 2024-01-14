const routes = require('./routes');
const JasaHandler = require('./handler');

module.exports = {
  name: 'jasa',
  version: '1.0.0',
  register: async (server, { container }) => {
    const jasaHandler = new JasaHandler(container);
    server.route(routes(jasaHandler));
  },
};
