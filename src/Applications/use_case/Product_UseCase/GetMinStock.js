// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

class GetMinStockUseCase {
  constructor(productRepository) {
    this._productRepository = productRepository;
  }

  async execute() {
    const products = await this._productRepository.getMinStock();
    return products;
  }
}

module.exports = GetMinStockUseCase;
