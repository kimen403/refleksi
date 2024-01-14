// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT
const OpenKasirPayloadDatabase = require('../../../Domains/transaksi/entities/OpenKasirPayloadDatabase');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class OpenKasirUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ kasirRepository }) {
    this._kasirRepository = kasirRepository;
  }

  async execute(useCasePayload) {
    const openKasir = new OpenKasirPayloadDatabase(useCasePayload);
    const result = await this._kasirRepository.openKasir(openKasir);
    return result;
  }
}

module.exports = OpenKasirUseCase;
