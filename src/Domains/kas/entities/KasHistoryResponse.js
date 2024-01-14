class KasHistoryResponse {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      id, memberId, tanggal, keterangan, type, coa, paymentType, total, isDelete,
    } = payload;

    // Buat Variabel
    this.id = id;
    this.member_id = memberId.substr(5);
    this.tanggal = tanggal;
    this.keterangan = keterangan;
    this.type = type;
    this.coa = coa;
    this.paymentType = paymentType;
    this.total = total;
    this.isDelete = isDelete;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      id, tanggal, keterangan, type, coa, paymentType, total, isDelete,
    } = payload;

    // veryfiy payload required
    if (!id || !tanggal || !keterangan || !type || !coa || !paymentType || !total || !isDelete) {
      throw new Error('KAS_HISTORY_RESPONSE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof id !== 'string') {
      throw new Error('KAS_HISTORY_RESPONSE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = KasHistoryResponse;
