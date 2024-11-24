const routes = require("./routes");
const OrderHandler = require("./handler");

module.exports = {
  name: "Order",
  version: "1.0.0",
  register: async (server, { container }) => {
    const orderHandler = new OrderHandler(container);
    server.route(routes(orderHandler));
  },
};
