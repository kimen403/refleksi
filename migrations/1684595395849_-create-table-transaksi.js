/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('transaksi', {
    // SS
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      unique: true,
    },
    member_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    // SS
    tanggal: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    // SS
    // keterangan = no faktur
    keterangan: {
      type: 'TEXT',
      notNull: true,
    },
    // CS -path
    // type = debit/kredit dari path
    type: {
      type: 'VARCHAR(6)',
      notNull: true,
    },
    // CS -path
    // kategori dari path (PENJUALAN)
    coa: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    // CS -payload
    paymentType: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    // CS -payload
    subTotal: {
      type: 'INTEGER',
      notNull: false,
    },
    // CS -payload
    diskonPercent: {
      type: 'FLOAT',
      notNull: true,
      default: 0,
    },
    // CS -payload
    total: {
      type: 'INTEGER',
      notNull: true,
    },
    // SS -auth
    admin_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    isDelete: {
      type: 'BOOLEAN',
      default: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('transaksi');
};
