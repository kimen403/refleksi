const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const JasaRepository = require('../../Domains/jasa/JasaRepository');

class JasaRepositoryPostgres extends JasaRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addJasa({
    name, price,
  }) {
    const status = true;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const id = `jasa-${this._idGenerator(5)}`;
    const query = {
      text: 'INSERT INTO tbljasa(jasa_id,nama,unit_price,status,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING jasa_id AS "jasaId",nama,unit_price AS price,status,created_at,updated_at',
      values: [id, name, price, status, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async deleteJasa(id) {
    const query = {
      text: 'UPDATE tbljasa SET status = false WHERE jasa_id = $1 RETURNING jasa_id AS "jasaId",status',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getJasaById(id) {
    const query = {
      text: 'SELECT jasa_id AS "jasaId",nama,unit_price AS price, status FROM tbljasa WHERE jasa_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Jasa tidak ditemukan');
    }
    return result.rows[0];
  }

  async getJasa() {
    const query = {
      text: 'SELECT jasa_id AS "jasaId",nama AS "name",unit_price AS price FROM tbljasa WHERE status = true',
    };
    const result = await this._pool.query(query);
    // console.log('getJasaRepository');
    return result.rows;
  }

  async verifyAvailableJasa(id) {
    const query = {
      text: 'SELECT jasa_id  FROM tbljasa WHERE jasa_id = $1 AND status = true',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Jasa tidak ditemukan');
    }

    return result.rows[0];
  }

  async getJasaPriceById(id) {
    const query = {
      text: 'SELECT unit_price AS price FROM tbljasa WHERE jasa_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Jasa tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = JasaRepositoryPostgres;
