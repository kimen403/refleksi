class GetJasaUseCase {
  constructor({ jasaRepository }) {
    this._jasaRepository = jasaRepository;
  }

  async execute() {
    const jasa = await this._jasaRepository.getJasa();
    return jasa;
  }
}

module.exports = GetJasaUseCase;
