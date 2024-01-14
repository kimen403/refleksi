class OpenKasirPayload {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      idAdmin,
      saldoAwal,
    } = payload;
    this.saldoAwal = saldoAwal;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      idAdmin,
      saldoAwal,
    } = payload;

    // veryfiy payload required
    if (!saldoAwal || !idAdmin) {
      throw new Error('OPEN_KASIR.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof saldoAwal !== 'number' || typeof idAdmin !== 'string') {
      throw new Error('OPEN_KASIR.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = OpenKasirPayload;
