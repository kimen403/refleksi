/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('member', {
    member_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      unique: true,
    },
    member_code: {
      type: 'varchar(25)',
      notNull: true,
    },
    member_name: {
      type: 'TEXT',
      notNull: true,
    },
    member_address: {
      type: 'TEXT',
      notNull: true,
    },
    member_phone: {
      type: 'varchar(15)',
      notNull: true,
    },
    member_ttl: {
      type: 'TEXT',
      notNull: true,
    },
    member_gender: {
      type: 'varchar(15)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('member');
};
