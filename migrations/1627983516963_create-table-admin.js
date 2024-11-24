/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable("admin", {
    id: {
      type: "VARCHAR(100)",
      primaryKey: true,
    },
    username: {
      type: "VARCHAR(100)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    fullname: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    role: {
      type: "VARCHAR(20)",
      notNull: true,
    },
    pic: {
      type: "TEXT",
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("admin");
};
