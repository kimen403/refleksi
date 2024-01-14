/* eslint-disable consistent-return */
const ClientError = require('../../Commons/exceptions/ClientError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const PegawaiRepository = require('../../Domains/pegawai/PegawaiRepository');

class PegawaiRepositoryPostgres extends PegawaiRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addPegawai({
    nama, jenisKelamin, tanggalLahir, foto = null, saldoAwal,
  }) {
    const id = `pegawai-${this._idGenerator(5)}`;

    const query = {
      text: 'INSERT INTO pegawai(id,nama,jenis_kelamin,tanggal_lahir,foto,saldo) VALUES($1,$2,$3,$4,$5,$6) RETURNING id',
      values: [id, nama, jenisKelamin, tanggalLahir, foto, saldoAwal],
    };

    const result = await this._pool.query(query);

    return result.rows[0].id;
  }

  async getAllPegawai() {
    const query = {
      text: 'SELECT id AS "idPegawai",nama,foto,saldo FROM pegawai WHERE status = true ORDER BY nama ASC',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async verifyAvailableNik(nik) {
    const query = {
      text: 'SELECT nik FROM pegawai WHERE nik = $1',
      values: [nik],
    };
    const result = await this._pool.query(query);
    if (result.rowCount > 0) {
      throw new InvariantError('NIK_ALREADY_EXISTS');
    }
  }

  async verifyAvailablePegawai(id) {
    const query = {
      text: 'SELECT id FROM pegawai WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (result.rowCount === 0) {
      throw new NotFoundError('Pegawai tidak ditemukan');
    }
  }

  async deletePegawaiById(id) {
    const query = {
      text: 'DELETE from pegawai WHERE id = $1',
      values: [id],
    };
    await this._pool.query(query);
  }

  async getPegawaiById(id) {
    const query = {
      text: 'SELECT id AS "idPegawai",nama,jenis_kelamin AS "jenisKelamin",saldo,foto,status FROM pegawai WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new NotFoundError('Pegawai tidak ditemukan');
    }
    return result.rows[0];
  }

  async getkreditSaldoById(idPegawai) {
    const filterTanggal = new Date().toISOString().split('T')[0];
    const query = {
      text: 'SELECT tanggal,keterangan,total AS "jumlah" FROM transaksi WHERE id_pegawai = $1 AND tanggal >= $2 ORDER BY tanggal DESC',
      values: [idPegawai, filterTanggal],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      return [];
    }
    return result.rows;
  }

  async reduceSaldoPegawai(idPegawai, nominal) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE pegawai SET saldo = saldo - $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [nominal, updatedAt, idPegawai],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new NotFoundError('Pegawai tidak ditemukan');
    }
    console.log('sukses reduce saldo pegawai');
    return 'success';
  }

  async addSaldoPegawai(idPegawai, nominal) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE pegawai SET saldo = saldo + $1, updated_at = $2 WHERE id = $3 ',
      values: [nominal, updatedAt, idPegawai],
    };
    try {
      await this._pool.query(query);
      // const result = await this._pool.query(query);
    } catch (error) {
      console.log(error);
    }

    return 'success';
  }

  // async getDebitSaldoById(idPegawai) {
  //   const filterTanggal = new Date().toISOString().split('T')[0];
  //   const query = {
  //     text: 'SELECT "createdAt" AS "tanggal", sub_total AS "jumlah" FROM detail_penjualan WHERE id_pegawai = $1 AND tanggal >= $2 ORDER BY tanggal DESC',
  //     values: [idPegawai, filterTanggal],
}

module.exports = PegawaiRepositoryPostgres;
