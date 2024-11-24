const InvariantError = require("../../Commons/exceptions/InvariantError");
const RegisteredAdmin = require("../../Domains/admin/entities/RegisteredAdmin");
const AdminRepository = require("../../Domains/admin/AdminRepository");

class AdminRepositoryPostgres extends AdminRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {
    // console.log('repo', username);
    const query = {
      text: "SELECT username FROM admin WHERE username = $1",
      values: [username],
    };
    // try {
    const result = await this._pool.query(query);
    // console.log('repo', result);
    // } catch (error) {
    //   console.log(error);
    // }
    if (result.rowCount) {
      throw new InvariantError("username tidak tersedia");
    }
  }

  async addAdmin(registerUser) {
    const { username, password, fullname, role } = registerUser;
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: "INSERT INTO admin VALUES($1, $2, $3, $4 ,$5) RETURNING id, username, fullname",
      values: [id, username, password, fullname, role],
    };

    const result = await this._pool.query(query);

    return new RegisteredAdmin({ ...result.rows[0] });
  }

  async getPasswordByUsername(username) {
    const query = {
      text: "SELECT password FROM admin WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);
    // console.log('repo', result.rows);

    if (!result.rowCount) {
      throw new InvariantError("username tidak ditemukan");
    }

    return result.rows[0].password;
  }

  async getIdByUsername(username) {
    console.log("repo", username);
    const query = {
      text: "SELECT id,fullname FROM admin WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);
    // console.log('repo', result.rows[0]);

    return result.rows[0];
  }

  async getRoleByUsername(username) {
    const query = {
      text: "SELECT role FROM admin WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }

    const { role } = result.rows[0];

    return role;
  }

  async isKasirOpen(idAdmin) {
    const query = {
      text: "SELECT id FROM kasir WHERE id_admin = $1 AND status = $2",
      values: [idAdmin, "open"],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      return false;
    }
    return true;
  }

  async getIdKasir(idAdmin) {
    const query = {
      text: "SELECT id FROM kasir WHERE id_admin = $1 AND status = $2",
      values: [idAdmin, "open"],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }
}

module.exports = AdminRepositoryPostgres;
