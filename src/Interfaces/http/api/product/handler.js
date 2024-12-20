// const AddCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/AddCommentUseCase");
// const DeleteCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/DeleteCommentUseCase");

const AddProductUseCase = require("../../../../Applications/use_case/Product_UseCase/AddProduct");
const GetAllProductUseCase = require("../../../../Applications/use_case/Product_UseCase/GetAllProduct");
const GetMinStockUseCase = require("../../../../Applications/use_case/Product_UseCase/GetMinStock");
const GetProductByIdUseCase = require("../../../../Applications/use_case/Product_UseCase/GetProductById");
const AddCategoryUseCase = require("../../../../Applications/use_case/Product_UseCase/AddCategory");
const GetCategoryUseCase = require("../../../../Applications/use_case/Product_UseCase/GetCategory");
const GetDraftProductUseCase = require("../../../../Applications/use_case/Product_UseCase/GetDraftProduct");
const AddActivateProductUseCase = require("../../../../Applications/use_case/Product_UseCase/AddActivateProduct");

class ProductHandler {
  constructor(container) {
    this._container = container;
    this.postProductsHandler = this.postProductsHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
    this.getProductsByIdHandler = this.getProductsByIdHandler.bind(this);
    this.getMinStockHandler = this.getMinStockHandler.bind(this);
    this.addCategoryHandler = this.addCategoryHandler.bind(this);
    this.getCategoryHandler = this.getCategoryHandler.bind(this);
    this.getDraftProductHandler = this.getDraftProductHandler.bind(this);
    this.postActivateProductHandler =
      this.postActivateProductHandler.bind(this);
  }

  async postProductsHandler(request, h) {
    const usecasePayload = request.payload;
    const addProductUseCase = this._container.getInstance(
      AddProductUseCase.name
    );
    const addedProduct = await addProductUseCase.execute(usecasePayload);
    const response = h.response({
      status: "success",
      massage: "Product berhasil ditambahkan",
      data: addedProduct,
    });
    response.code(201);
    return response;
  }

  async postActivateProductHandler(request, h) {
    const usecasePayload = request.payload;
    console.log("masuk handler activate product", request.payload);
    const addActivateProductUseCase = this._container.getInstance(
      AddActivateProductUseCase.name
    );
    const addedProduct = await addActivateProductUseCase.execute(
      usecasePayload
    );
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
    console.log(id);
    console.log("masuk handler get product by id");
    const getProductByIdUseCase = this._container.getInstance(
      GetProductByIdUseCase.name
    );
    const products = await getProductByIdUseCase.execute(id);
    console.log("DRAFT DETAIL;", products);
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
    const addCategoryUseCase = this._container.getInstance(AddCategoryUseCase);
    const addedCategory = await addCategoryUseCase.execute(usecasePayload);
    const response = h.response({
      status: "success",
      data: addedCategory,
    });
    response.code(201);
    return response;
  }

  async getCategoryHandler(request, h) {
    const getCategoryUseCase = this._container.getInstance(
      GetCategoryUseCase.name
    );
    const category = await getCategoryUseCase.execute();
    const response = h.response({
      status: "success",
      data: category,
    });
    response.code(200);
    return response;
  }

  async getDraftProductHandler(request, h) {
    const getDraftProductUseCase = this._container.getInstance(
      GetDraftProductUseCase.name
    );
    const products = await getDraftProductUseCase.execute();
    console.log("DRAFT DETAIL;");
    const response = h.response({
      status: "success",
      data: products,
    });
    response.code(200);
    return response;
  }
}
module.exports = ProductHandler;
