// const AddCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/AddCommentUseCase");
// const DeleteCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/DeleteCommentUseCase");

const AddProductUseCase = require("../../../../Applications/use_case/Product_UseCase/AddProduct");
const GetAllProductUseCase = require("../../../../Applications/use_case/Product_UseCase/GetAllProduct");
const GetMinStockUseCase = require("../../../../Applications/use_case/Product_UseCase/GetMinStock");
const GetProductByIdUseCase = require("../../../../Applications/use_case/Product_UseCase/GetProductById");

class ProductHandler {
  constructor(container) {
    this._container = container;
    this.postProductsHandler = this.postProductsHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
    this.getProductsByIdHandler = this.getProductsByIdHandler.bind(this);
    this.getMinStockHandler = this.getMinStockHandler.bind(this);
  }

  async postProductsHandler(request, h) {
    const usecasePayload = request.payload;
    console.log(usecasePayload);
    const addProductUseCase = this._container.getInstance(
      AddProductUseCase.name
    );
    const addedProduct = await addProductUseCase.execute(usecasePayload);
    const response = h.response({
      status: "success",
      data: addedProduct,
    });
    response.code(201);
    return response;
  }

  async getProductsHandler(request, h) {
    console.log("masuk handler get all product");
    const getAllProductUseCase = this._container.getInstance(
      GetAllProductUseCase.name
    );
    const products = await getAllProductUseCase.execute();

    const response = h.response({
      status: "success",
      data: products,
    });
    response.code(200);
    return response;
  }

  async getProductsByIdHandler(request, h) {
    const { id } = request.params;
    const getProductByIdUseCase = this._container.getInstance(
      GetProductByIdUseCase.name
    );
    const products = await getProductByIdUseCase.execute(id);

    const response = h.response({
      status: "success",
      data: products,
    });
    response.code(200);
    return response;
  }

  async getMinStockHandler(request, h) {
    const getMinStockUseCase = this._container.getInstance(
      GetMinStockUseCase.name
    );
    const products = await getMinStockUseCase.execute();

    const response = h.response({
      status: "success",
      data: products,
    });
    response.code(200);
    return response;
  }

  async addCategoryHandler(request, h) {
    const usecasePayload = request.payload;
    const addCategoryUseCase = this._container.getInstance(
      AddCategoryUseCase.name
    );
    const addedCategory = await addCategoryUseCase.execute(usecasePayload);
    const response = h.response({
      status: "success",
      data: addedCategory,
    });
    response.code(201);
    return response;
  }
}
module.exports = ProductHandler;
