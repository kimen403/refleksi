class SaldoDetailPegawai {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      idPegawai, jenisTransaksi, keterangan, jumlah,
    } = payload;
    this.idPegawai = idPegawai;
    this.jenisTransaksi = jenisTransaksi;
    this.keterangan = keterangan;
    this.jumlah = jumlah;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      idPegawai, jenisTransaksi, keterangan, jumlah,
    } = payload;

    // veryfiy payload required
    if (!idPegawai || !jenisTransaksi || !keterangan || !jumlah) {
      throw new Error('SALDO_DETAIL_PEGAWAI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof nama !== 'string' || typeof jenisTransaksi !== 'string' || typeof keterangan !== 'string' || typeof jumlah !== 'number') {
      throw new Error('SALDO_DETAIL_PEGAWAI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = SaldoDetailPegawai;
