const InvariantError = require('../../../Commons/exceptions/InvariantError');

class CheckKasirUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ kasirRepository }) {
    this._kasirRepository = kasirRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(idKasir) {
    const kasir = await this._kasirRepository.checkKasir(idKasir);
    // const newComment = new NewComment(useCasePayload);
    if (kasir.status === 'close') {
      throw new InvariantError('Kasir belum dibuka');
    }
  }
}

module.exports = CheckKasirUseCase;
