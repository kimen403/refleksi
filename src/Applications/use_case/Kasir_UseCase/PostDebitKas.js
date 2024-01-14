// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class PostDebitKasUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ kasirRepository, transaksiRepository, idGenerator }) {
    this._kasRepository = kasirRepository;
    this._transaksiRepository = transaksiRepository;
    this._idGenerator = idGenerator;
  }

  // NOTE: UseCasePayload akan menerima parameter nominal,keterangan AuthDATA akan menerima parameter idKasir, idAdmin
  async execute(useCasePayload, authData) {
    const { idKasir, id } = authData;
    const { nominal, keterangan } = useCasePayload;
    await this._kasRepository.verifyAvailableKasir(idKasir);
    await this._kasRepository.updateSaldoKasir(idKasir, nominal);
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const idTransaksi = `DP-${date}-${this._idGenerator(4)}`;
    const type = 'in';
    const coa = 'DEPOSIT';
    const paymentType = 'Cash';
    console.log(idTransaksi);
    const newTransaksi = {
      idKasir,
      type,
      adminId: id,
      coa,
      paymentType,
      subTotal: nominal,
      totalHarga: nominal,
      keterangan: keterangan || 'Debit Kas',
    };
    console.log('BERJALAN');
    const addedTransaksi = await this._transaksiRepository.addTransaksi(idTransaksi, newTransaksi, idKasir);
    console.log(addedTransaksi);
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = PostDebitKasUseCase;
