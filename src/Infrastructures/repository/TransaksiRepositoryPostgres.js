/* eslint-disable consistent-return */

const InvariantError = require('../../Commons/exceptions/InvariantError');
const TransaksiRepository = require('../../Domains/transaksi/TransaksiRepository');

class TransaksiRepositoryPostgres extends TransaksiRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addTransaksi(idTransaksi, {
    memberId = null, type, tanggal = null, coa, subTotal, diskonPercent = 0, totalHarga, adminId, paymentType, keterangan,
  }, idKasir) {
    const isDelete = false;

    const tanggalTransaksi = tanggal || new Date().toISOString();
    const query = {
      text: 'INSERT INTO transaksi VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11,$12,$13) RETURNING id,total AS "totalHarga"',
      values: [idTransaksi, memberId, tanggalTransaksi, keterangan, type, coa,
        paymentType, subTotal, diskonPercent, totalHarga, adminId, isDelete, idKasir],
    };
    try {
      const { rows } = await this._pool.query(query);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw new InvariantError('transaksi gagal silahkan hubungi admin!');
    }
  }

  async addTransaksiUangMasukKas({
    memberId = null, type, tanggal = null, coa = 'COH', jumlah, diskonPercent, adminId, paymentType = 'Cash', keterangan,
  }, idKasir) {
    const isDelete = false;
    const idTransaksi = `TransaksiDeposit-${this._idGenerator(5)}`;
    const query = {
      text: 'INSERT INTO transaksi VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11,$12,$13) RETURNING id,total AS "jumlah"',
      values: [idTransaksi, memberId, tanggal, keterangan, type, coa,
        paymentType, jumlah, diskonPercent, jumlah, adminId, isDelete, idKasir],
    };
    try {
      const { rows } = await this._pool.query(query);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async addTransaksiKasDebit({
    memberId = null, jumlah, diskonPercent = 0, keterangan,
  }, coa, idKasir, type, adminId) {
    const paymentType = 'Cash';
    const isDelete = false;
    const idTransaksi = `TransaksiDebit-${this._idGenerator(5)}`;
    const tanggal = new Date().toISOString();
    const query = {
      text: 'INSERT INTO transaksi VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11,$12,$13) RETURNING id,total AS "jumlah"',
      values: [idTransaksi, memberId, tanggal, keterangan, type, coa,
        paymentType, jumlah, diskonPercent, jumlah, adminId, isDelete, idKasir],
    };
    try {
      const { rows } = await this._pool.query(query);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async addTransaksiKasKredit(idTransaksi, {
    idPegawai, jumlah, diskonPercent = 0, keterangan, memberId = '-', coa, type, adminId, idKasir,
  }) {
    const paymentType = 'Cash';
    const isDelete = false;
    const _idTransaksi = idTransaksi ?? `TransaksiKredit-${this._idGenerator(5)}`;
    const tanggal = new Date().toISOString();
    const query = {
      text: 'INSERT INTO transaksi VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11,$12,$13 ,$14 ,$15) RETURNING id,total AS "jumlah"',
      values: [_idTransaksi, memberId, tanggal, keterangan, type, coa,
        paymentType, jumlah, diskonPercent, jumlah, adminId, isDelete, idKasir, false, idPegawai],
    };
    try {
      const { rows } = await this._pool.query(query);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getAllTransaksi(idKasir) {
    const query = {
      text: 'SELECT * FROM transaksi WHERE id_kasir = $1 AND "isDelete" = false ORDER BY tanggal DESC',
      values: [idKasir],
    };

    const result = await this._pool.query(query);
    console.log(result.rows);
    return result.rows;
  }

  async getHistoryTransaksiPegawai(idPegawai) {
    console.log('masuk history transaksi pegawai repository');
    const query = {
      text: 'SELECT * FROM uangpegawai WHERE "idPegawai" = $1 ',
      values: [idPegawai],
    };
    const result = await this._pool.query(query);
    console.log(result.rows);
    return result.rows;
  }

  async getHistoryTransaksiPenjualan(idKasir) {
    const query = {
      text: 'SELECT * FROM transaksi WHERE id_kasir = $1 AND "coa" = $2 AND "isDelete"= false ORDER BY tanggal DESC',
      values: [idKasir, 'PENJUALAN'],
    };

    const result = await this._pool.query(query);
    console.log(result.rows);
    return result.rows;
  }

  async getTransaksiById(idTransaksi) {
    const query = {
      text: 'SELECT * FROM transaksi WHERE id = $1 AND "isDelete" = false',
      values: [idTransaksi],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getTotalTransaksiById(idTransaksi) {
    const query = {
      text: 'SELECT total FROM transaksi WHERE id = $1 AND "isDelete" = false',
      values: [idTransaksi],
    };

    const result = await this._pool.query(query);
    return result.rows[0].total;
  }

  async deleteTransaksi(idTransaksi, keterangan) {
    console.log(idTransaksi, keterangan);
    const query = {
      text: 'UPDATE transaksi SET "isDelete" = true, "is_deleteKeterangan" = $2 WHERE id = $1 RETURNING id',
      values: [idTransaksi, keterangan],
    };
    // mengurangi saldo kasir
    console.log('berhasil update transaksi');

    const querySaldoKasir = {
      text: 'UPDATE kasir SET saldo_seharusnya = saldo_seharusnya - (SELECT total FROM transaksi WHERE id = $1) WHERE id = (SELECT id_kasir FROM transaksi WHERE id = $1)',
      values: [idTransaksi],
    };
    try {
      await this._pool.query(querySaldoKasir);
    } catch (error) {
      console.log(error);
    }
    console.log('berhasil update saldo kasir');
    // mengurangi saldo pegawai
    const querySaldoPegawai = {
      text: 'UPDATE pegawai SET saldo = saldo - ((SELECT SUM(detail_penjualan.sub_total) FROM detail_penjualan WHERE id_pegawai = pegawai.id AND id_penjualan =$1)*0.5) FROM detail_penjualan WHERE detail_penjualan.id_penjualan = $1 AND pegawai.id = detail_penjualan.id_pegawai',
      values: [idTransaksi],
    };
    try {
      await this._pool.query(querySaldoPegawai);
    } catch (error) {
      console.log(error);
    }
    console.log('berhasil update saldo pegawai');
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyTransaksi(idTransaksi) {
    const query = {
      text: 'SELECT 1 FROM transaksi WHERE id = $1',
      values: [idTransaksi],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvariantError('transaksi tidak ditemukan');
    }
  }

  async postTransaksiPenjualan(useCasePayload) {
    const dateId = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const id = `Penjualan-${dateId}-${this._idGenerator(5)}`;
    const tanggal = new Date();
    const keterangan = 'PENJUALAN JASA';
    const kategori = 'debit';
    // membuat jumlah => jumlah uang transaksi
    let totalPrice = 0;
    await useCasePayload.data.forEach((data) => {
      data.jasa.forEach((jasa) => {
        totalPrice += jasa.price * jasa.total;
      });
    });
    // console.log(totalPrice);
    const adminId = 'admin-1';
    const isDelete = false;
    const isDeleteKeterangan = '';
    const { method } = useCasePayload;
    const query = {
      text: 'INSERT INTO transaksi VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING id',
      values: [id, tanggal, keterangan, kategori, method, totalPrice, adminId, isDelete, isDeleteKeterangan],
    };

    await this._pool.query(query);

    // console.log('data berhasil ditambahkan transaksi');
    const result2 = useCasePayload.data.map((data) => {
      const idKaryawan = data.pegawai.id;
      data.jasa.map(async (jasa) => {
        const idDetail = `Detail-${dateId}-${this._idGenerator(5)}`;
        const idTransaksi = id;
        const idJasa = jasa.id;
        const jumlah = jasa.total;
        const harga = jasa.price;
        const subTotal = jasa.price * jasa.total;
        const createdAt = new Date();
        const updatedAt = createdAt;

        const queryDetail = {
          text: 'INSERT INTO detail_penjualan VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING id',
          values: [idDetail, idTransaksi, idKaryawan, idJasa, jumlah, harga, subTotal, isDelete, isDeleteKeterangan, createdAt, updatedAt],
        };

        await this._pool.query(queryDetail);
      });
      return 'suksesDetail';
    });
    return (result2);
  }
}

module.exports = TransaksiRepositoryPostgres;
