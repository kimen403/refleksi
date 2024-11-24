/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("order", {
    order_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    nama: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    no_wa: {
      type: "VARCHAR(20)",
      notNull: true,
    },
    alamat: {
      type: "TEXT",
      notNull: true,
    },
    status: {
      type: "VARCHAR(20)",
      notNull: true,
      default: "Processing",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("order");
};
