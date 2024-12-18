// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const ActivateProduct = require("../../../Domains/product/entities/ActivateProduct");

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class AddActivateProductUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const activateProduct = new ActivateProduct(useCasePayload);
    activateProduct.status = 1;
    await this._productRepository.activateProduct(activateProduct);
    return activateProduct;
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);
    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = AddActivateProductUseCase;
