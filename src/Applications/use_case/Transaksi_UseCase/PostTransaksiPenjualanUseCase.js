class PostTransaksiPenjualanUseCase {
  constructor({ transaksiRepository }) {
    this._transaksiRepository = transaksiRepository;
  }

  async execute(useCasePayload) {
    const result = await this._transaksiRepository.postTransaksiPenjualan(useCasePayload);
    // console.log('data berhasil ditambahkan');
    return result;
  }
}

module.exports = PostTransaksiPenjualanUseCase;
