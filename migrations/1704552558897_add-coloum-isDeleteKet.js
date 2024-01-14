/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('transaksi', {
    is_deleteKeterangan: {
      type: 'TEXT',
      notNull: false,
      default: 'false',
    },
  });
};

exports.down = (pgm) => {};
