const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const KasirRepository = require('../../Domains/transaksi/KasirRepository');

class KasirRepositoryPostgres extends KasirRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async historyKasir(idKasir) {
    const query = {
      text: 'SELECT id,member_id AS "memberId",tanggal,keterangan,type,coa,"paymentType",total,"isDelete" FROM transaksi WHERE id_kasir = $1 ORDER BY tanggal DESC',
      values: [idKasir],
    };
    try {
      await this._pool.query(query);
    } catch (error) {
      console.log(error);
    }
    const { rows } = await this._pool.query(query);
    console.log(rows);
    return rows;
  }

  async openKasir(newKasir) {
    const id = `kasir-${this._idGenerator(5)}`;
    const date = new Date().toISOString();
    const { idAdmin, saldoAwal } = newKasir;
    // console.log(idAdmin, saldoAwal);
    const status = 'open';

    const query = {
      text: 'INSERT INTO kasir(id,id_admin,tanggal,saldo_awal,saldo_seharusnya,status) VALUES($1, $2, $3, $4, $5,$6) RETURNING id, status',
      values: [id, idAdmin, date, saldoAwal, saldoAwal, status],
    };
    try {
      const { rows } = await this._pool.query(query);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw new InvariantError('Gagal menambahkan kasir');
    }
  }

  async closeKasir(closeKasirPayload) {
    const { idKasir, saldoAkhir, keterangan } = closeKasirPayload;
    const status = 'close';
    const updatedDate = new Date().toISOString();

    const query = {
      text: 'UPDATE kasir SET "saldo_akhir" = $1, "status" = $2, "keterangan" = $3, "tanggal" = $4 WHERE id = $5 RETURNING id, status',
      values: [saldoAkhir, status, keterangan, updatedDate, idKasir],
    };

    const { rows } = await this._pool.query(query);

    return rows[0];
  }

  async addSaldo(addSaldoPayload) {
    const { idKasir, addSaldo } = addSaldoPayload;
    const updatedDate = new Date().toISOString();

    const query = {
      text: 'UPDATE kasir SET "saldo_seharusnya" = "saldo_seharusnya" + $1, "tanggal" = $2 WHERE id = $3 RETURNING id, saldoAwal, saldoSeharusnya',
      values: [addSaldo, updatedDate, idKasir],
    };

    const { rows } = await this._pool.query(query);

    return rows[0];
  }

  async reduceSaldo(reduceSaldoPayload) {
    const { idKasir, reduceSaldo } = reduceSaldoPayload;
    const updatedDate = new Date().toISOString();

    const query = {
      text: 'UPDATE kasir SET "saldo_seharusnya" = "saldo_seharusnya" - $1, "tanggal" = $2 WHERE id = $3 RETURNING id, "saldo_awal", "saldo_seharusnya"',
      values: [reduceSaldo, updatedDate, idKasir],
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async getKasirByIdAdmin(idAdmin) {
    const query = {
      text: 'SELECT id, id_admin, saldo_awal, saldo_seharusnya, saldo_akhir, status, tanggal, keterangan FROM kasir WHERE id_admin = $1 AND status= $2',
      values: [idAdmin, 'open'],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new InvariantError('Kasir belum dibuka');
    }
    return result.rows[0];

    // return rows[0];
  }

  async verifyKasir(idAdmin, idKasir) {
    const query = {
      text: 'SELECT 1 FROM kasir WHERE id_admin = $1 AND id = $2',
      values: [idAdmin, idKasir],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async verifyAvailableKasir(idKasir) {
    const query = {
      text: 'SELECT 1 FROM kasir WHERE id = $1',
      values: [idKasir],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvariantError('Kasir tidak ditemukan');
    }
  }

  async checkKasir(idKasir) {
    const query = {
      text: 'SELECT status FROM kasir WHERE id = $1',
      values: [idKasir],
    };

    const { rows } = await this._pool.query(query);
    console.log(rows[0]);
    return rows[0];
  }

  async updateSaldoKasir(idKasir, saldo) {
    const query = {
      text: 'UPDATE kasir SET "saldo_seharusnya" = saldo_seharusnya + $1 WHERE id = $2 ',
      values: [saldo, idKasir],
    };
    try {
      await this._pool.query(query);
    } catch (error) {
      console.log(error);
      throw new InvariantError('Gagal menambahkan saldo');
    }
  }
}

module.exports = KasirRepositoryPostgres;
