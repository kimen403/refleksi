class TransaksiRepository {
  async addTransaksi(newThread) {
    throw new Error('TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addTransaksiUangMasukKas(newThread) {
    throw new Error('TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableTransaksi(threadId) {
    throw new Error('TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTransaksiById(threadId) {
    throw new Error('TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllTransaksi() {
    throw new Error('TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteTransaksi(id) {
    throw new Error('TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TransaksiRepository;
