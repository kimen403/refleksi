class GetAllHistoryKasirUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ kasirRepository }) {
    this._kasirRepository = kasirRepository;
  }

  async execute(idKasir) {
    console.log('GetAllHistoryKasirUseCase');
    const result = await this._kasirRepository.historyKasir(idKasir);
    return result;
  }
}

module.exports = GetAllHistoryKasirUseCase;
