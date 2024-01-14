// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const CloseKasirPayload = require('../../../Domains/transaksi/entities/CloseKasirPayload');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class CloseKasirUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ kasirRepository, threadRepository }) {
    this._kasirRepository = kasirRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(useCasePayload) {
    console.log('useCasePayload', useCasePayload);
    const closeKasirPayload = new CloseKasirPayload(useCasePayload);
    const result = await this._kasirRepository.closeKasir(closeKasirPayload);
    console.log('result', result);
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
    return result;
  }
}

module.exports = CloseKasirUseCase;
