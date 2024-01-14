const routes = require('./routes');
const ProductHandler = require('./handler');

module.exports = {
  name: 'Product',
  version: '1.0.0',
  register: async (server, { container }) => {
    const productHandler = new ProductHandler(container);
    server.route(routes(productHandler));
  },
};
