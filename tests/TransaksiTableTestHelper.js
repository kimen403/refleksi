/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const TransaksiTableTestHelper = {
  async addTransaksi({
    id = 'Transaksi-001',
    memberId = 'member-123',
    tanggal = '2021-08-08T07:22:13.000Z',
    keterangan = 'no faktur',
    type = 'debit',
    coa = 'PENJUALAN',
    paymentType = 'Cash',
    subTotal = 10000,
    diskonPercent = 0,
    totalHarga = 10000,
    adminId = 'admin-123',
    isDeleted = false,
  }) {
    const query = {
      text: 'INSERT INTO transaksi VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      values: [id, memberId, tanggal, keterangan, type, coa, paymentType, subTotal, diskonPercent, totalHarga, adminId, isDeleted],
    };

    await pool.query(query);
  },

  async findTransaksiById(id) {
    const query = {
      text: 'SELECT * FROM transaksi WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM transaksi WHERE 1=1');
  },
};

module.exports = TransaksiTableTestHelper;
