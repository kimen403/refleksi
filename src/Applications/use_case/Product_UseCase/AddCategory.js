// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const NewCategory = require("../../../Domains/category/entities/NewCategory");

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class NewCategoryUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productRepository }) {
    this._categoryRepository = productRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(useCasePayload) {
    const newCategory = new NewCategory(useCasePayload);
    const addedCategory = await this._categoryRepository.addCategory(
      newCategory
    );
    return addedCategory;
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);
    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = NewCategoryUseCase;
