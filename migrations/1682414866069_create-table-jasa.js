exports.up = (pgm) => {
  pgm.createTable(
    'tbljasa',
    {
      jasa_id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
        unique: true,
      },
      nama: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      unit_price: {
        type: 'INTEGER',
        notNull: true,
      },
      status: {
        type: 'BOOLEAN',
        notNull: true,
        default: true,
      },
      created_at: {
        type: 'timestamp',
        notNull: true,
      },
      updated_at: {
        type: 'timestamp',
        notNull: true,
      },
    },
  );
};

exports.down = (pgm) => {
  pgm.dropTable('tbljasa');
};
