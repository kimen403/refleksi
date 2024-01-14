/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('admin', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    role: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    pic: {
      type: 'TEXT',
      notNull: false,
    },

  });
};

exports.down = (pgm) => {
  pgm.dropTable('admin');
};
