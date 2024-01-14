class GetAllTransaksiUseCase {
  constructor({ transaksiRepository }) {
    this._transaksiRepository = transaksiRepository;
  }

  async execute(idKasir) {
    const transaksi = await this._transaksiRepository.getAllTransaksi(idKasir);

    return transaksi;
  }
}

module.exports = GetAllTransaksiUseCase;
