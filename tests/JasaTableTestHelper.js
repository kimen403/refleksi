/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const JasaTableTestHelper = {
  async addJasa({
    jasaId = '1',
    nama = 'Jasa 1',
    unitPrice = 100000,
    status = true,
    createdAt = '2021-08-08T07:22:33.555Z',
    updatedAt = '2021-08-08T07:22:33.555Z',
  }) {
    const query = {
      text: 'INSERT INTO tbljasa VALUES($1, $2, $3, $4, $5, $6)',
      values: [jasaId, nama, unitPrice, status, createdAt, updatedAt],
    };

    await pool.query(query);
  },
  async findJasaByName(nama) {
    const query = {
      text: 'SELECT * FROM tbljasa WHERE nama = $1',
      values: [nama],
    };

    const result = await pool.query(query);
    return result.rows;
  },
  async findJasaById(id) {
    const query = {
      text: 'SELECT * FROM tbljasa WHERE "jasa_id" = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM tbljasa WHERE 1=1');
  },
};

module.exports = JasaTableTestHelper;
