class NewPegawai {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      nama,
      jenisKelamin,
      tanggalLahir,
      saldoAwal,
      foto,
    } = payload;
    this.nama = nama;
    this.jenisKelamin = jenisKelamin;
    this.tanggalLahir = tanggalLahir;
    this.saldoAwal = saldoAwal || 0;
    this.foto = foto;
  }

  _verifyPayload({
    nama,
    saldoAwal = 0,
    jenisKelamin,
    tanggalLahir,

  }) {
    if (!nama || !jenisKelamin || !tanggalLahir) {
      throw new Error('NEW_PEGAWAI.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof nama !== 'string' || typeof saldoAwal !== 'number' || typeof jenisKelamin !== 'string' || typeof tanggalLahir !== 'string') {
      throw new Error('NEW_PEGAWAI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = NewPegawai;
