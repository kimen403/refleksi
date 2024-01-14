// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetPegawaiByIdUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ pegawaiRepository }) {
    this._pegawaiRepository = pegawaiRepository;
    // this._commentRepository = commentRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(useCasePayload) {
    // console.log('useCasePayload', useCasePayload);
    const pegawai = await this._pegawaiRepository.getPegawaiById(useCasePayload);
    return pegawai;

    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = GetPegawaiByIdUseCase;
