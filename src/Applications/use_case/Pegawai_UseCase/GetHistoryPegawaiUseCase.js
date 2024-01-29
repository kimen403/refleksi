// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetHistoryTransaksiPegawaiUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ transaksiRepository, pegawaiRepository }) {
    this._transaksiRepository = transaksiRepository;
    this._pegawaiRepository = pegawaiRepository;
    // this._= ;
  }

  // NOTE - UseCasePayload akan menerima data berupa idPegawai
  async execute(useCasePayload) {
    await this._pegawaiRepository.verifyAvailablePegawai(useCasePayload);
    console.log('useCasePayload', useCasePayload);
    console.log('masuk history transaksi pegawai');
    const result = await this._transaksiRepository.getHistoryTransaksiPegawai(useCasePayload);
    return result;
  }
}

module.exports = GetHistoryTransaksiPegawaiUseCase;
