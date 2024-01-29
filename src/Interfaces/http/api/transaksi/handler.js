const { use } = require('bcrypt/promises');
const PostTransaksiKasDebit = require('../../../../Applications/use_case/Kas_UseCase/PostTransaksiKasDebit');
const PostTransaksiKasKreditUseCase = require('../../../../Applications/use_case/Kas_UseCase/PostTransaksiKasKredit');
const CheckKasirUseCase = require('../../../../Applications/use_case/Kasir_UseCase/CheckKasirStatus');
const CloseKasirUseCase = require('../../../../Applications/use_case/Kasir_UseCase/CloseKasir');
const OpenKasirUseCase = require('../../../../Applications/use_case/Kasir_UseCase/OpenKasir');
const AddTransaksiPenjualanUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/AddTransaksiPenjualanUseCase');
const GetAllTransaksiUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/GetAllTransaksiUseCase');
const GetTransaksiDetailByIdUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/GetTransaksiDetailByIdUseCase');
const PostCancelTransaksiUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/PostCancelTransaksiUseCase');

const PostTransaksiPenjualanUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/PostTransaksiPenjualanUseCase');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const GetHistoryPenjualanUseCase = require('../../../../Applications/use_case/Transaksi_UseCase/GetHistoryPenjualanUseCase');

class TransaksiHandler {
  constructor(container) {
    this._container = container;

    this.postTransaksiHandler = this.postTransaksiHandler.bind(this);
    this.getAllTransaksiHandler = this.getAllTransaksiHandler.bind(this);
    this.postTransaksiPenjualanHandler = this.postTransaksiPenjualanHandler.bind(this);
    this.getTransaksiDetailByIdHandler = this.getTransaksiDetailByIdHandler.bind(this);
    this.postTransaksiKasHandler = this.postTransaksiKasHandler.bind(this);
    this.postCancelTransaksiHandler = this.postCancelTransaksiHandler.bind(this);
    this.getHistoryPenjualanHandler = this.getHistoryPenjualanHandler.bind(this);
  }

  async postTransaksiHandler(request, h) {
    const authPayload = request.auth.credentials;
    console.log('authPayload', authPayload);
    const { idKasir } = request.payload;
    const checkKasirUseCase = this._container.getInstance(CheckKasirUseCase.name);
    await checkKasirUseCase.execute(idKasir);
    const useCasePayload = request.payload;
    const addTransaksiUseCase = this._container.getInstance(AddTransaksiPenjualanUseCase.name);
    const addedTransaksi = await addTransaksiUseCase.execute(useCasePayload, authPayload);

    const response = h.response({
      status: 'success',
      data:
        addedTransaksi,

    });
    response.code(201);
    return response;
  }

  async postTransaksiKasHandler(request, h) {
    const { kategori, type } = request.params;
    console.log('kategori', kategori);
    console.log('masuk handler transaksi kas');
    switch (type) {
      case 'DEBIT': {
        const useCasePayload = request.payload;
        const { idKasir, id } = request.auth.credentials;
        const checkKasirUseCase = this._container.getInstance(CheckKasirUseCase.name);
        await checkKasirUseCase.execute(idKasir);

        const addTransaksiKasUseCase = this._container.getInstance(PostTransaksiKasDebit.name);
        const addedTransaksiKas = await addTransaksiKasUseCase.execute(useCasePayload, kategori, idKasir, type, id);

        const response = h.response({
          status: 'success',
          data:
            addedTransaksiKas,
        });
        response.code(201);
        return response;
      }

      // TODO - KREDIT

      case 'KREDIT': {
        const useCasePayload = request.payload;
        const { idKasir, id } = request.auth.credentials;
        const checkKasirUseCase = this._container.getInstance(CheckKasirUseCase.name);
        await checkKasirUseCase.execute(idKasir);
        console.log('masuk kredit');

        const addTransaksiKasUseCase = this._container.getInstance(PostTransaksiKasKreditUseCase.name);
        const addedTransaksiKas = await addTransaksiKasUseCase.execute(useCasePayload, kategori, idKasir, type, id);

        const response = h.response({
          status: 'success',
          data:
            addedTransaksiKas,
        });
        response.code(201);
        return response;
      }

      //   const useCasePayload = request.payload;
      //   const { idKasir } = request.auth.credentials;
      //   const checkKasirUseCase = this._container.getInstance(CheckKasirUseCase.name);
      //   await checkKasirUseCase.execute(idKasir);

      //   const addTransaksiKasUseCase = this._container.getInstance(.name);
      //   const addedTransaksiKas = await addTransaksiKasUseCase.execute(useCasePayload, kategori, idKasir, type);

      //   const response = h.response({
      //     status: 'success',
      //     data:
      //       addedTransaksiKas,
      //   });
      //   response.code(201);
      //   return response;
      // }
      default:
        throw new InvariantError('Tipe Transaksi Tidak Ditemukan');
    }

    // const authPayload = request.auth.credentials;
    // const { idKasir } = request.payload;
    // const checkKasirUseCase = this._container.getInstance(CheckKasirUseCase.name);
    // await checkKasirUseCase.execute(idKasir);
    // const useCasePayload = request.payload;
    // const addTransaksiKasUseCase = this._container.getInstance(PostTransaksiKasUseCase.name);
    // const addedTransaksiKas = await addTransaksiKasUseCase.execute(useCasePayload, authPayload);

    // const response = h.response({
    //   status: 'success',
    //   data:
    //     addedTransaksiKas,
    // });
    // response.code(201);
    // return response;
  }

  async getAllTransaksiHandler(request, h) {
    console.log('masuk handler');
    const authPayload = request.auth.credentials;
    console.log(authPayload);
    const getAllTransaksiUseCase = this._container.getInstance(GetAllTransaksiUseCase.name);
    const transaksi = await getAllTransaksiUseCase.execute(authPayload.idKasir);

    const response = h.response({
      status: 'success',
      historyTransaksi:
        transaksi,
    });
    response.code(200);
    return response;
  }

  async postTransaksiPenjualanHandler(request, h) {
    const useCasePayload = request.payload;

    console.log(useCasePayload);
    const { idKasir } = request.payload;
    const checkKasirUseCase = this._container.getInstance(CheckKasirUseCase.name);
    await checkKasirUseCase.execute(idKasir);
    const authPayload = request.auth.credentials;
    // console.log(authPayload);
    const addTransaksiPenjualan = this._container.getInstance(AddTransaksiPenjualanUseCase.name);
    // console.log('masuk handler');
    const addedTransaksiPenjualan = await addTransaksiPenjualan.execute(useCasePayload, authPayload);

    // console.log(addedTransaksiPenjualan);
    const response = h.response({
      status: 'success',
      data:
        addedTransaksiPenjualan,
    });
    response.code(201);
    return response;
  }

  async postCancelTransaksiHandler(request, h) {
    console.log('masuk handler cancel');
    const useCasePayload = request.payload;
    console.log(useCasePayload);
    const { id } = request.params;
    useCasePayload.id = id;

    const authPayload = request.auth.credentials;
    console.log(authPayload);
    const postCancelTransaksiUseCase = this._container.getInstance(PostCancelTransaksiUseCase.name);
    await postCancelTransaksiUseCase.execute(useCasePayload, authPayload);

    const response = h.response({
      status: 'success',
    });
    response.code(201);
    return response;
  }

  async getTransaksiDetailByIdHandler(request, h) {
    const { id } = request.params;
    const getTransaksiDetailByIdUseCase = this._container.getInstance(GetTransaksiDetailByIdUseCase.name);
    const transaksiDetail = await getTransaksiDetailByIdUseCase.execute(id);
    // console.log(id);
    const response = h.response({
      status: 'success',
      transaksiDetail,
    });
    response.code(200);
    return response;
  }

  async getHistoryPenjualanHandler(request, h) {
    const { idKasir } = request.auth.credentials;
    console.log('idKasir', idKasir);
    const getHistoryPenjualanUseCase = this._container.getInstance(GetHistoryPenjualanUseCase.name);
    const historyPenjualan = await getHistoryPenjualanUseCase.execute(idKasir);

    const response = h.response({
      status: 'success',
      historyTransaksi: historyPenjualan,
    });

    response.code(200);
    return response;
  }
}

module.exports = TransaksiHandler;
