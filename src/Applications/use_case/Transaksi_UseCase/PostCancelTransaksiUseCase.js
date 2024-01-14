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

    const totalTransaksi = await this._transaksiRepository.getTotalTransaksiById(useCasePayload.id);
    const transaksiDetail = await this._transaksiDetailRepository.getCancelTransaksiById(useCasePayload.id);

    // eslint-disable-next-line no-restricted-syntax
    console.log(transaksiDetail);
    for (const item of transaksiDetail) {
      console.log(item);
      console.log(item.jenis);
      console.log(item.id_pegawai);
      console.log(item.sub_total);
      if (item.jenis === 'JASA') {
        await this._pegawaiRepository.reduceSaldoPegawai(item.id_pegawai, item.sub_total * 0.5);
      } else if (item.jenis === 'BARANG') {
        await this._productRepository.addStock(item.id_barang_jasa, item.qty);
        // await this._pegawaiRepository.reduceSaldo({ idPegawai: '-', reduceSaldo: item.subTotal });
      }
    }
    console.log('BERHASIL');
    await this._kasirRepository.reduceSaldo({ idKasir: authUser.idKasir, reduceSaldo: totalTransaksi });
    await this._transaksiRepository.deleteTransaksi(useCasePayload.id, useCasePayload.keterangan);
    await this._transaksiDetailRepository.deleteTransaksiDetail(useCasePayload.id);
  }
}

module.exports = PostCancelTransaksiUseCase;
