// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const { use } = require('bcrypt/promises');
const KasDebitCOH = require('../../../Domains/kas/entities/KasDebitCOH');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class PostTransaksiKasDebit {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ transaksiRepository, kasirRepository }) {
    this._transaksiRepository = transaksiRepository;
    this._kasirRepository = kasirRepository;
  }

  async execute(useCasePayload, kategori, idKasir, type, adminId) {
    // save to database

    switch (kategori) {
      case 'COH': {
        console.log('masuk COH');
        // useCasePayload = {keterangan, jumlah}
        const newTransaksiValidate = new KasDebitCOH(useCasePayload);
        const newTransaksi = await this._transaksiRepository.addTransaksiKasDebit(newTransaksiValidate, kategori, idKasir, type, adminId);
        await this._kasirRepository.updateSaldoKasir(idKasir, newTransaksi.jumlah);
        return newTransaksi;
      }

      case 'DEPOSIT': {
        // useCasePayload = {keterangan, jumlah}
        const newTransaksiValidate = KasDebitCOH(useCasePayload);
        const newTransaksi = await this._transaksiRepository.addTransaksiBank(newTransaksiValidate, idKasir, type);
        return newTransaksi;
      }
      // case 'BANK':
      //   const newTransaksi = await this._transaksiRepository.addTransaksiBank(useCasePayload, idKasir,type);
      //   return newTransaksi;
      // case 'DEBIT':
      //   const newTransaksi = await this._transaksiRepository.addTransaksiDebit(useCasePayload, idKasir,type);
      //   return newTransaksi;
      default:
        throw new Error('POST_TRANSAKSI_USE_CASE.NOT_CONTAIN_ANY_KATEGORI');
    }
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = PostTransaksiKasDebit;
