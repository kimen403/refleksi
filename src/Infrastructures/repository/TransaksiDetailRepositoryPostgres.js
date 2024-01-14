const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const TransaksiDetailRepository = require('../../Domains/transaksi/TransaksiDetailRepository');

class TransaksiDetailRepositoryPostgres extends TransaksiDetailRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addDetailPenjualanJasa(idPenjualan, newDetail) {
    const { jasaId, qty, idPegawai } = newDetail;
    const idDetail = this._idGenerator(30);
    const isDeleted = false;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const jenis = 'JASA';

    // unitPrice, subTotal from table barangJasa
    const query = {
      text: 'INSERT INTO detail_penjualan ("id" ,"jenis","unit_price", "sub_total", "id_penjualan", "id_barang_jasa","id_pegawai", "qty", "isDelete", "createdAt", "updatedAt") VALUES ($8,$9,(SELECT "unit_price" FROM tbljasa WHERE "jasa_id" = $2),(SELECT "unit_price" * $4 FROM tbljasa WHERE "jasa_id" = $2), $1, $2, $3, $4, $5, $6,$7)RETURNING id,sub_total AS "subTotal"',
      values: [idPenjualan, jasaId, idPegawai, qty, isDeleted, createdAt, updatedAt, idDetail, jenis],
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async addDetailPenjualanBarang(idPenjualan, newDetail) {
    const { productId, qty } = newDetail;
    const idPegawai = '-';
    const idDetail = this._idGenerator(30);
    const isDeleted = false;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const jenis = 'BARANG';

    // unitPrice, subTotal from table barangJasa
    const query = {
      text: 'INSERT INTO detail_penjualan ("id" ,"jenis","unit_price", "sub_total", "id_penjualan", "id_barang_jasa","id_pegawai", "qty", "isDelete", "createdAt", "updatedAt") VALUES ($8,$9,(SELECT "unit_price" FROM tblproduct WHERE "product_id" = $2),(SELECT "unit_price" * $4 FROM tblproduct WHERE "product_id" = $2), $1, $2, $3, $4, $5, $6,$7)RETURNING id,sub_total AS "subTotal"',
      values: [idPenjualan, productId, idPegawai, qty, isDeleted, createdAt, updatedAt, idDetail, jenis],
    };

    const { rows } = await this._pool.query(query);
    // console.log('add detail penjualan barang');
    return rows[0];
  }

  async getDetailPenjualanById(id) {
    const query = {
      text: 'SELECT detail_penjualan.id, detail_penjualan.jenis, detail_penjualan.unit_price AS "unitPrice", detail_penjualan.sub_total AS "subTotal", detail_penjualan.id_barang_jasa AS "idBarangJasa", pegawai.nama AS "namaPegawai", detail_penjualan.qty, tbljasa.nama , tbljasa."jasa_id" AS "jasaId", tblproduct."product_name" AS "namaBarang", tblproduct."product_id" AS "productId" FROM detail_penjualan LEFT JOIN tbljasa ON detail_penjualan.id_barang_jasa = tbljasa.jasa_id LEFT JOIN pegawai ON detail_penjualan.id_pegawai = pegawai.id LEFT JOIN tblproduct ON detail_penjualan.id_barang_jasa = tblproduct.product_id WHERE detail_penjualan.id_penjualan = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async verifyAvailableTransaksi(tId) {
    const query = {
      text: 'SELECT 1 FROM transaksi WHERE id = $1',
      values: [tId],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('transaksi tidak ditemukan');
    }

    return true;
  }

  async getCancelTransaksiById(id) {
    const query = {
      text: 'SELECT jenis,id_pegawai,id_barang_jasa,sub_total,qty FROM detail_penjualan WHERE id_penjualan = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async deleteTransaksiDetail(id) {
    const date = new Date().toISOString();
    const query = {
      text: 'UPDATE detail_penjualan SET "isDelete" = true ,"createdAt" = $2 WHERE id_penjualan = $1',
      values: [id, date],
    };
    await this._pool.query(query);
  }
}

module.exports = TransaksiDetailRepositoryPostgres;
