/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('tblproductcategory', {
    category_id: {
      type: 'serial',
      primaryKey: true,
    },
    category_name: {
      type: 'varchar(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('tblproductcategory');
};
