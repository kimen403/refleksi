exports.up = (pgm) => {
  pgm.createTable("order_detail", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
      unique: true,
    },
    // id transaksi
    id_penjualan: {
      type: "VARCHAR(50)",
      notNull: true,
    },

    // CS -payload
    id_product: {
      type: "VARCHAR(15)",
      notNull: true,
    },
    // CS -payload
    qty: {
      type: "float",
      notNull: true,
    },
    isDelete: {
      type: "BOOLEAN",
      default: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("order_detail");
};
