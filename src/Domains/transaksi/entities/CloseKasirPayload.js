class CloseKasirPayload {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      idKasir, saldoAkhir, keterangan,
    } = payload;
    this.idKasir = idKasir;
    this.saldoAkhir = saldoAkhir;
    this.keterangan = keterangan;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      idKasir, saldoAkhir, keterangan,
    } = payload;

    // veryfiy payload required
    if (!idKasir || !saldoAkhir || !keterangan) {
      throw new Error('CLOSE_KASIR.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof idKasir !== 'string' || typeof saldoAkhir !== 'number' || typeof keterangan !== 'string') {
      throw new Error('CLOSE_KASIR.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = CloseKasirPayload;
