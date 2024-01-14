class DeletePegawaiByIdUseCase {
  constructor({ pegawaiRepository }) {
    this._pegawaiRepository = pegawaiRepository;
  }

  async execute(id) {
    await this._pegawaiRepository.verifyAvailablePegawai(id);
    // console.log('id', id);
    await this._pegawaiRepository.deletePegawaiById(id);
  }
}

module.exports = DeletePegawaiByIdUseCase;
