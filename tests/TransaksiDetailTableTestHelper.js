/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const TransaksiDetailTableTestHelper = {
  async addPenjualan({
    id = 'TransaksiDetail-001',
    idPenjualan = 'Penjualan-001',
    jenis = 'jasa',
    idPegawai = 'Pegawai-001',
    idBarangJasa = 'JASA-001',
    qty = 1,
    price = 10000,
    subTotal = 10000,
    isDeleted = false,
    updatedAt = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO detail_penjualan VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      values: [id, idPenjualan, jenis, idPegawai, idBarangJasa, qty, price, subTotal, isDeleted, updatedAt],
    };

    await pool.query(query);
  },

  async findPenjualanById(id) {
    const query = {
      text: 'SELECT * FROM detail_penjualan WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM detail_penjualan WHERE 1=1');
  },
};

module.exports = TransaksiDetailTableTestHelper;
