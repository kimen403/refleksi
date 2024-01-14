// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const NewProduct = require('../../../Domains/product/entities/NewProduct');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class AddProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(useCasePayload) {
    const newProduct = new NewProduct(useCasePayload);
    // console.log('masuk usecase');
    const addedProduct = await this._productRepository.addProduct(newProduct);
    return addedProduct;
  }
}

module.exports = AddProductUseCase;
