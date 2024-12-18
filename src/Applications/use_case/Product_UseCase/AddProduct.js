// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const NewProduct = require("../../../Domains/product/entities/NewProduct");
const KursUseCase = require("../utils/kurs");

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');
function getKurs() {
  const kurs = new KursUseCase();
  return kurs.execute();
}

class AddProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
    // this._threadRepository= threadRepository;
  }

  // name = string
  // brand = string
  // categoryId = int
  // price = int
  // link = string
  // image = []

  async execute(useCasePayload) {
    console.log(useCasePayload);
    const kursEURIDR = await getKurs();
    const newProduct = new NewProduct(useCasePayload);
    newProduct.price *= kursEURIDR;
    newProduct.sellprice = newProduct.price + 500000;
    console.log("masuk usecase NEW PRODUCT");
    const addedProduct = await this._productRepository.addProduct(newProduct);
    return addedProduct;
  }
}

module.exports = AddProductUseCase;
