// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetDraftProductUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productRepository, threadRepository }) {
    this._productRepository = productRepository;
  }

  async execute() {
    console.log("GetDraftProductUseCase.execute");
    const products = await this._productRepository.getDraftProduct();
    return products;
  }
}

module.exports = GetDraftProductUseCase;
