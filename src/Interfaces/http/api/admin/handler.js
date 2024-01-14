const AddAdminUseCase = require('../../../../Applications/use_case/AdminUseCase/AddAdminUseCase');

class AdminsHandler {
  constructor(container) {
    this._container = container;

    this.postAdminHandler = this.postAdminHandler.bind(this);
  }

  async postAdminHandler(request, h) {
    const addAdminUseCase = this._container.getInstance(AddAdminUseCase.name);
    const addedAdmin = await addAdminUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedAdmin,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = AdminsHandler;
