/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('tblbarangmasuk', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
      unique: true,
    },
    product_id: {
      type: 'integer',
      notNull: true,
    },
    tanggal: {
      type: 'varchar(50)',
      notNull: true,
    },
    qty: {
      type: 'float',
      notNull: true,
    },
    harga: {
      type: 'float',
      notNull: true,
    },
    total: {
      type: 'float',
      notNull: true,
    },
    supplier_id: {
      type: 'integer',
      notNull: true,
    },
    user_id: {
      type: 'integer',
      notNull: true,
    },
  });

  pgm.sql('INSERT INTO tblproductunit (unit_name) VALUES (\'pcs\')');
  pgm.sql('INSERT INTO tblproductunit (unit_name) VALUES (\'box\')');
  pgm.sql('INSERT INTO tblproductunit (unit_name) VALUES (\'lusin\')');
  pgm.sql('INSERT INTO tblproductcategory ("category_name") VALUES (\'Jasa\')');
  pgm.sql('INSERT INTO tblproductcategory ("category_name") VALUES (\'Minuman\')');
  pgm.sql('INSERT INTO tblproductcategory ("category_name") VALUES (\'Manakan\')');
};

exports.down = (pgm) => {
  pgm.dropTable('tblbarangmasuk');
};
