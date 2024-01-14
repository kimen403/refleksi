// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetAllProductUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute() {
    // console.log('masuk usecase get all product');
    const products = await this._productRepository.getAllProduct();
    return products;
  }
}

module.exports = GetAllProductUseCase;
