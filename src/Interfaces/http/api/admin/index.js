const AdminsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'admin',
  register: async (server, { container }) => {
    const adminsHandler = new AdminsHandler(container);
    server.route(routes(adminsHandler));
  },
};
