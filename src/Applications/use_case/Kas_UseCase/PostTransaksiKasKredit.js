// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class PostTransaksiKasKreditUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ transaksiRepository, kasirRepository, pegawaiRepository }) {
    this._transaksiRepository = transaksiRepository;
    this._kasirRepository = kasirRepository;
    this._pegawaiRepository = pegawaiRepository;
  }

  async execute(useCasePayload, kategori, idKasir, type, adminId) {
    const kategory = kategori.toUpperCase();
    switch (kategory) {
      case 'BIAYA OPERASIONAL': {
        // useCasePayload = {keterangan, jumlah}
        const newTransaksiValidate = useCasePayload;
        const newTransaksi = await this._transaksiRepository.addTransaksiKasKredit(newTransaksiValidate, kategori, idKasir, type, adminId);
        await this._kasirRepository.updateSaldoKasir(idKasir, newTransaksi.jumlah);
        return newTransaksi;
      }

      case 'KASBONPEGAWAI': {
        // useCasePayload = {keterangan ,idPegawai, jumlah}
        const newTransaksiValidate = useCasePayload;
        const newTransaksi = await this._transaksiRepository.addTransaksiKasKredit(newTransaksiValidate, kategori, idKasir, type, adminId);
        await this._kasirRepository.updateSaldoKasir(idKasir, newTransaksi.jumlah);
        return newTransaksi;
      }

      default:
        throw new Error('POST_TRANSAKSI_USE_CASE.NOT_CONTAIN_ANY_KATEGORI');
    }
  }
}

module.exports = PostTransaksiKasKreditUseCase;
