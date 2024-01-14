class GetKasirByIdAdminUseCase {
  constructor({ kasirRepository }) {
    this._kasirRepository = kasirRepository;
  }

  async execute(idAdmin) {
    const kasir = await this._kasirRepository.getKasirByIdAdmin(idAdmin);
    return kasir;
  }
}

module.exports = GetKasirByIdAdminUseCase;
