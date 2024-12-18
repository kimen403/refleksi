const { options } = require("@hapi/hapi/lib/cors");

const routes = (handler) => [
  {
    method: "POST",
    path: "/product",
    handler: handler.postProductsHandler,
  },
  {
    method: "POST",
    path: "/product/activate",
    handler: handler.postActivateProductHandler,
    options: {
      auth: "refleksi_jwt",
      plugins: {
        hacli: {
          permissions: ["admin", "MANAGER", "OWNER"],
        },
      },
    },
  },
  {
    method: "GET",
    path: "/products",
    handler: handler.getProductsHandler,
  },
  {
    method: "GET",
    path: "/product/{id}",
    handler: handler.getProductsByIdHandler,
  },

  {
    method: "GET",
    path: "/products/minstock",
    handler: handler.getMinStockHandler,
  },
  {
    method: "POST",
    path: "/add/category",
    handler: handler.addCategoryHandler,
  },
  {
    method: "GET",
    path: "/category",
    handler: handler.getCategoryHandler,
  },
  {
    method: "GET",
    path: "/products/draft",
    handler: handler.getDraftProductHandler,
    options: {
      auth: "refleksi_jwt",
      plugins: {
        hacli: {
          permissions: ["admin", "MANAGER", "OWNER"],
        },
      },
    },
  },
];

module.exports = routes;
