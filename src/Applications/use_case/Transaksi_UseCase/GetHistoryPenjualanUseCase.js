// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetHistoryPenjualanUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ transaksiRepository }) {
    this._transaksiRepository = transaksiRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(idKasir) {
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);
    console.log('masuk use case get history penjualan');
    const historyPenjualan = await this._transaksiRepository.getHistoryTransaksiPenjualan(idKasir);
    return historyPenjualan;
    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = GetHistoryPenjualanUseCase;
