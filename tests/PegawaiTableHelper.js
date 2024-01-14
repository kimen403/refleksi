/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const PegawaiTableTestHelper = {
  async addPegawai({
    id = 'Pegawai001',
    nama = 'Pegawai 1',
    jenisKelamin = 'L',
    nik = '1234567890123456',
    tanggalLahir = '2021-08-08T07:22:33.555Z',
    alamat = 'Jl. Pegawai 1',
    noHp = '081234567890',
    email = 'a@gmail.com',
    foto = 'image.jpg',
    status = true,
    createdAt = '2021-08-08T07:22:33.555Z',
    updatedAt = '2021-08-08T07:22:33.555Z',
  }) {
    const query = {
      text: 'INSERT INTO pegawai VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12 )',
      values: [id, nama, jenisKelamin, nik, tanggalLahir, alamat, noHp, email, foto, status, createdAt, updatedAt],
    };

    await pool.query(query);
  },

  async findPegawaiById(id) {
    const query = {
      text: 'SELECT * FROM pegawai WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM pegawai WHERE 1=1');
  },
};

module.exports = PegawaiTableTestHelper;
