const InvariantError = require('../../../Commons/exceptions/InvariantError');

class KasDebitCOH {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      keterangan, jumlah,
    } = payload;
    this.keterangan = keterangan;
    this.jumlah = jumlah;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      keterangan, jumlah,
    } = payload;
    // veryfiy payload required
    if (!keterangan || !jumlah) {
      throw new Error('KAS_DEBITCOH.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof keterangan !== 'string' || typeof jumlah !== 'number') {
      throw new Error('KAS_DEBITCOH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = KasDebitCOH;
