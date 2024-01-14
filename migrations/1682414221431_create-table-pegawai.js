/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('pegawai', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      unique: true,
    },
    nama: {
      type: 'TEXT',
      notNull: true,
    },
    jenis_kelamin: {
      type: 'TEXT',
      notNull: true,
    },
    tanggal_lahir: {
      type: 'TEXT',
      notNull: true,
    },
    foto: {
      type: 'TEXT',
      default: '',
      notNull: false,
    },
    saldo: {
      type: 'INTEGER',
      default: 0,
      notNull: true,
    },
    status: {
      type: 'BOOLEAN',
      default: true,
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
      notNull: true,
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('pegawai');
};
