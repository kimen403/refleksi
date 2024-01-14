/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('tblproductunit', {
    unit_id: {
      type: 'serial',
      primaryKey: true,
    },
    unit_name: {
      type: 'varchar(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('tblproductunit');
};
