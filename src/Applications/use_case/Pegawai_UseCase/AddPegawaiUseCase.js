const NewPegawai = require('../../../Domains/pegawai/entities/NewPegawai');

class AddPegawaiUseCase {
  constructor({ pegawaiRepository }) {
    this._pegawaiRepository = pegawaiRepository;
  }

  async execute(useCasePayload) {
    // console.log('masuk add pegawai use case');
    // await this._pegawaiRepository.verifyAvailableNik(useCasePayload.nik);
    const newPegawai = new NewPegawai(useCasePayload);

    return this._pegawaiRepository.addPegawai(newPegawai);
  }
}

module.exports = AddPegawaiUseCase;
