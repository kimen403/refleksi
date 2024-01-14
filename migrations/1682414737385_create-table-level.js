/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('level', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
      unique: true,
    },
    role: {
      type: 'VARCHAR(20)',
      notNull: true,
      unique: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('level');
};
