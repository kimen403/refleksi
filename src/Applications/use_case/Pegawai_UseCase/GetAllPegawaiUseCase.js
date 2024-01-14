class GetAllPegawaiUseCase {
  constructor({ pegawaiRepository }) {
    this._pegawaiRepository = pegawaiRepository;
  }

  async execute() {
    const pegawai = await this._pegawaiRepository.getAllPegawai();
    return pegawai;
  }
}

module.exports = GetAllPegawaiUseCase;
