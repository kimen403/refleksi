/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('transaksi', {
    id_kasir: {
      type: 'VARCHAR(50)',
      default: '0',
      notNull: false,
    },
  });

  // pgm.addConstraint('transaksi', 'fk_transaksi.id_kasir_kasir.id', 'FOREIGN KEY("id_kasir") REFERENCES kasir(id) ON DELETE CASCADE');

  // pgm.addConstraint('transaksi', 'unique_id_kasir', 'UNIQUE(id_kasir)');
};

exports.down = (pgm) => {
  // pgm.dropConstraint('transaksi', 'unique_id_kasir');
  // pgm.dropConstraint('transaksi', 'fk_transaksi.id_kasir_kasir.id');
  pgm.dropColumns('transaksi', 'id_kasir');
};
