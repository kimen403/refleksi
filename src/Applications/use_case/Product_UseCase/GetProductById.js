// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetProductByIdUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const productId = useCasePayload;
    console.log("masuk use case get product by id", productId);
    await this._productRepository.verifyAvailableProduct(productId);

    console.log("masuk use case get product by id");
    const product = await this._productRepository.getProductById(productId);
    return product;
  }
}

module.exports = GetProductByIdUseCase;
