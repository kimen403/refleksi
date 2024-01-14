class OpenKasirPayloadDatabase {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      idAdmin, saldoAwal,
    } = payload;
    this.idAdmin = idAdmin;
    this.saldoAwal = saldoAwal;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      idAdmin, saldoAwal,
    } = payload;

    // veryfiy payload required
    if (!idAdmin || !saldoAwal) {
      throw new Error('OPEN_KASIR_DATABASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof idAdmin !== 'string' || typeof saldoAwal !== 'number') {
      throw new Error('OPEN_KASIR_DATABASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = OpenKasirPayloadDatabase;
