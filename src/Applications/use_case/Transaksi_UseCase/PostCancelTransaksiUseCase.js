// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
class PostCancelTransaksiUseCase {
  constructor({
    transaksiRepository, pegawaiRepository, transaksiDetailRepository, kasirRepository, productRepository,
  }) {
    this._transaksiRepository = transaksiRepository;
    this._pegawaiRepository = pegawaiRepository;
    this._transaksiDetailRepository = transaksiDetailRepository;
    this._kasirRepository = kasirRepository;
    this._productRepository = productRepository;
  }

  // NOTE : payload { id, keterangan }
  async execute(useCasePayload, authUser) {
    await this._transaksiRepository.verifyTransaksi(useCasePayload.id);

    await this._transaksiRepository.deleteTransaksi(useCasePayload.id, useCasePayload.keterangan);
    await this._transaksiDetailRepository.deleteTransaksiDetail(useCasePayload.id);
  }
}

module.exports = PostCancelTransaksiUseCase;
