const AddJasaUseCase = require('../../../../Applications/use_case/Jasa_UseCase/addJasaUseCase');
const DeleteJasaUseCase = require('../../../../Applications/use_case/Jasa_UseCase/deleteJasaUseCase');
const GetJasaUseCase = require('../../../../Applications/use_case/Jasa_UseCase/getJasaUseCase');

class JasaHandler {
  constructor(container) {
    this._container = container;
    this.postJasaHandler = this.postJasaHandler.bind(this);
    this.getJasaHandler = this.getJasaHandler.bind(this);
    this.deleteJasaHandler = this.deleteJasaHandler.bind(this);
  }

  async postJasaHandler(request, h) {
    const usecasePayload = {
      name: request.payload.name,
      price: request.payload.price,
    };
    const addJasaUseCase = this._container.getInstance(AddJasaUseCase.name);
    const addedJasa = await addJasaUseCase.execute(usecasePayload);

    const response = h.response({
      status: 'success',
      data:
        addedJasa,
    });
    response.code(201);
    return response;
  }

  async getJasaHandler(r, h) {
    const getJasaUseCase = this._container.getInstance(GetJasaUseCase.name);
    // console.log('getJasaHandler');
    const jasa = await getJasaUseCase.execute();

    const response = h.response({
      status: 'success',
      jasa,
    });
    response.code(200);
    return response;
  }

  async deleteJasaHandler(request, h) {
    const { id } = request.params;
    const deleteJasaUseCase = this._container.getInstance(DeleteJasaUseCase.name);
    // console.log('deleteJasaHandler', id);
    await deleteJasaUseCase.execute(id);
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = JasaHandler;
