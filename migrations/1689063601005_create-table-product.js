/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('tblproduct', {
    product_id: {
      type: 'varchar(25)',
      unique: true,
      primaryKey: true,
    },
    barcode: {
      type: 'varchar(25)',
      unique: true,
      notNull: true,
    },
    product_name: {
      type: 'varchar(50)',
      notNull: true,
    },
    unit_id: {
      type: 'integer',
      notNull: true,
    },
    category_id: {
      type: 'integer',
      notNull: true,
    },
    stock_now: {
      type: 'float',
      notNull: true,
      default: 0,
    },
    stock_min: {
      type: 'float',
      notNull: true,
      default: 0,
    },
    unit_price: {
      type: 'float',
      notNull: true,
    },
    purchase_price: {
      type: 'float',
      notNull: true,
    },
    image: {
      type: 'text',
      notNull: false,
    },
  });

  pgm.createIndex('tblproduct', ['unit_id', 'category_id']);
  pgm.createIndex('tblproduct', 'category_id');
};

exports.down = (pgm) => {
  pgm.dropTable('tblproduct');
};
