const NewJasa = require('../../../Domains/jasa/entities/NewJasa');

class AddJasaUseCase {
  constructor({ jasaRepository }) {
    this._jasaRepository = jasaRepository;
  }

  async execute(useCasePayload) {
    const jasa = new NewJasa(useCasePayload);
    return this._jasaRepository.addJasa(jasa);
  }
}

module.exports = AddJasaUseCase;
