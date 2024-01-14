// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const AddMinusStock = require('../../../Domains/product/entities/AddMinusStock');

class AddStockUseCase {
  constructor(productRepository) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const newStock = new AddMinusStock(useCasePayload);
    try {
      await this._productRepository.verifyAvailableProduct(newStock.productId);
      await this._productRepository.addStock(newStock.productId, newStock.addMinusStock);
      return 'Stock Berhasil Ditambahkan';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = AddStockUseCase;
