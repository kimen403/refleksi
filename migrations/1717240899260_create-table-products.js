// product_id SERIAL PRIMARY KEY,
// name VARCHAR(100) NOT NULL,
// code VARCHAR(50) UNIQUE NOT NULL,
// product_type VARCHAR(50) NOT NULL,
// category_id INT REFERENCES categories(category_id),
// purchase_price NUMERIC(10,2) NOT NULL,
// selling_price NUMERIC(10,2) NOT NULL,
// stock_type VARCHAR(50) NOT NULL,
// stock INT DEFAULT 0,
// min_stock INT DEFAULT 0,
// unit VARCHAR(50) NOT NULL,
// weight NUMERIC(10,2) DEFAULT 0,
// discount NUMERIC(5,2) DEFAULT 0,
// description TEXT

/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("products", {
    product_id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    category_id: {
      type: "INT",
      references: "categories(category_id)",
    },

    sell_price: {
      type: "NUMERIC(30)",
      notNull: true,
    },
    // FIXME - add purchase price in repository
    buy_price: {
      type: "NUMERIC(30)",
      notNull: true,
    },
    stock: {
      type: "INT",
      default: 5,
    },
    weight: {
      type: "NUMERIC(10,2)",
      default: 0,
    },
    is_discount: {
      type: "BOOLEAN",
      default: "FALSE",
    },
    discount: {
      type: "NUMERIC(5,2)",
      default: 0,
    },
    // //FIXME - add status in repository
    status: {
      type: "INT",
      default: 1,
    },
    description: {
      type: "TEXT",
      default: "No Description",
    },
    link: {
      type: "TEXT",
    },
    brand: {
      type: "VARCHAR(50)",
    },
    created_at: {
      type: "TIMESTAMP",
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("products");
};
