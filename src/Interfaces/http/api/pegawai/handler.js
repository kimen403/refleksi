const AddPegawaiUseCase = require('../../../../Applications/use_case/Pegawai_UseCase/AddPegawaiUseCase');
const DeletePegawaiByIdUseCase = require('../../../../Applications/use_case/Pegawai_UseCase/DeletePegawaiByIdUseCase');
const GetAllPegawaiUseCase = require('../../../../Applications/use_case/Pegawai_UseCase/GetAllPegawaiUseCase');
const GetHistoryTransaksiPegawaiUseCase = require('../../../../Applications/use_case/Pegawai_UseCase/GetHistoryPegawaiUseCase');
const GetPegawaiByIdUseCase = require('../../../../Applications/use_case/Pegawai_UseCase/GetPegawaiByIdUseCase');

class PegawaiHandler {
  constructor(container) {
    this._container = container;
    this.postPegawaiHandler = this.postPegawaiHandler.bind(this);
    this.getAllPegawaiHandler = this.getAllPegawaiHandler.bind(this);
    this.deletePegawaiByIdHandler = this.deletePegawaiByIdHandler.bind(this);
    this.getPegawaiByIdHandler = this.getPegawaiByIdHandler.bind(this);
    this.getHistoryTransaksiPegawaiHandler = this.getHistoryTransaksiPegawaiHandler.bind(this);
  }

  async postPegawaiHandler(request, h) {
    const usecasePayload = request.payload;
    console.log(usecasePayload);
    const addPegawaiUseCase = this._container.getInstance(AddPegawaiUseCase.name);
    const id = await addPegawaiUseCase.execute(usecasePayload);
    const response = h.response({
      status: 'success',
      data: { id },
    });
    response.code(201);
    return response;
  }

  async getAllPegawaiHandler() {
    const getAllPegawaiUseCase = this._container.getInstance(GetAllPegawaiUseCase.name);
    const pegawai = await getAllPegawaiUseCase.execute();
    console.log('getAllPegawaiHandler', pegawai);
    return {
      status: 'success',
      data: { pegawai },
    };
  }

  async deletePegawaiByIdHandler(request, h) {
    const { id } = request.params;
    const deletePegawaiByIdUseCase = this._container.getInstance(DeletePegawaiByIdUseCase.name);
    await deletePegawaiByIdUseCase.execute(id);

    const response = h.response({
      status: 'success',
    });
    return response;
  }

  async getPegawaiByIdHandler(request, h) {
    const { id } = request.params;
    const getPegawaiByIdUseCase = this._container.getInstance(GetPegawaiByIdUseCase.name);
    const pegawai = await getPegawaiByIdUseCase.execute(id);
    return {
      status: 'success',
      data: pegawai,
    };
  }

  async getHistoryTransaksiPegawaiHandler(request, h) {
    console.log('masuk history transaksi pegawai handler');
    const { id } = request.params;
    const getHistoryPegawaiUseCase = this._container.getInstance(GetHistoryTransaksiPegawaiUseCase.name);
    console.log(id);
    const pegawai = await getHistoryPegawaiUseCase.execute(id);
    const response = h.response({
      status: 'success',
      pegawai,
    });
    return response;
  }
}

module.exports = PegawaiHandler;
