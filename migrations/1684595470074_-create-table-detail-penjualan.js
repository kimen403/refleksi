/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('detail_penjualan', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      unique: true,
    },
    // id transaksi
    id_penjualan: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    jenis: {
      // barang atau jasa
      type: 'VARCHAR(15)',
      notNull: true,
    },
    id_pegawai: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    // CS -payload
    id_barang_jasa: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    // CS -payload
    qty: {
      type: 'float',
      notNull: true,
    },
    // CS -payload
    unit_price: {
      type: 'INTEGER',
      notNull: true,
    },
    // SS -payload
    sub_total: {
      type: 'INTEGER',
      notNull: true,
    },
    isDelete: {
      type: 'BOOLEAN',
      default: false,
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('detail_penjualan');
};
