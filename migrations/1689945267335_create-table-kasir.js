exports.up = (pgm) => {
  pgm.createTable('kasir', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      unique: true,
    },
    id_admin: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    tanggal: {
      type: 'timestamp',
      notNull: true,
    },
    saldo_awal: {
      type: 'INT',
      notNull: true,
    },
    saldo_akhir: {
      type: 'INT',
      notNull: false,
    },
    saldo_seharusnya: {
      type: 'INT',
      notNull: true,
    },
    keterangan: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    status: {
      type: 'VARCHAR(10)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('kasir');
};
