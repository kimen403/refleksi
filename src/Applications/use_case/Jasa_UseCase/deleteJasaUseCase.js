class DeleteJasaUseCase {
  constructor({ jasaRepository }) {
    this._jasaRepository = jasaRepository;
  }

  async execute(useCasePayload) {
    // await this._jasaRepository.verifyAvailableJasa(useCasePayload.id);
    return this._jasaRepository.deleteJasa(useCasePayload);
  }
}

module.exports = DeleteJasaUseCase;
