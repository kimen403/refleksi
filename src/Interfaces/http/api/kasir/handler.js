const DeleteAuthenticationUseCase = require('../../../../Applications/use_case/Auth_UseCase/DeleteAuthenticationUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/Auth_UseCase/RefreshAuthenticationUseCase');
const CloseKasirUseCase = require('../../../../Applications/use_case/Kasir_UseCase/CloseKasir');
const GetAllHistoryKasirUseCase = require('../../../../Applications/use_case/Kasir_UseCase/GetAllHistoryKasir');
const GetKasirByIdAdminUseCase = require('../../../../Applications/use_case/Kasir_UseCase/GetKasirByIdAdmin');
const OpenKasirUseCase = require('../../../../Applications/use_case/Kasir_UseCase/OpenKasir');
const PostCreditKasUseCase = require('../../../../Applications/use_case/Kasir_UseCase/PostCreditKas');
const PostDebitKasUseCase = require('../../../../Applications/use_case/Kasir_UseCase/PostDebitKas');

class KasirHandler {
  constructor(container) {
    this._container = container;

    this.getKasirByIdHandler = this.getKasirByIdHandler.bind(this);
    this.postOpenKasirHandler = this.postOpenKasirHandler.bind(this);
    this.postCloseKasirHandler = this.postCloseKasirHandler.bind(this);
    this.getHistoryKasirHandler = this.getHistoryKasirHandler.bind(this);
    this.postKasDebitHandler = this.postKasDebitHandler.bind(this);
    this.postKasOutHandler = this.postKasOutHandler.bind(this);
  }

  async getHistoryKasirHandler(request, h) {
    const { idKasir } = request.auth.credentials;
    const getAllTransaksiUseCase = this._container.getInstance(GetAllHistoryKasirUseCase.name);
    console.log(idKasir);
    const kasirHistory = await getAllTransaksiUseCase.execute(idKasir);

    const response = h.response(

      { kasirHistory },
    );
    response.code(200);

    return response;
  }

  async getKasirByIdHandler(request, h) {
    const { id } = request.auth.credentials;
    const getKasirByIdAdminUseCase = this._container.getInstance(GetKasirByIdAdminUseCase.name);
    const kasir = await getKasirByIdAdminUseCase.execute(id);
    console.log(kasir);
    const response = h.response({
      status: 'success',
      kasir,
    });
    response.code(200);
    return response;
  }

  async postOpenKasirHandler(request, h) {
    const authPayload = request.auth.credentials;
    console.log(authPayload);
    console.log(request.payload);
    const useCasePayload = {
      idAdmin: authPayload.id,
      saldoAwal: request.payload.saldoAwal,
    };
    const refreshAuthenticationUseCase = this._container.getInstance(
      RefreshAuthenticationUseCase.name,
    );

    const { refreshToken } = request.payload;

    const openKasirUseCase = this._container.getInstance(OpenKasirUseCase.name);
    const deleteAuthUseCase = this._container.getInstance(DeleteAuthenticationUseCase.name);
    // eslint-disable-next-line vars-on-top
    var openKasirResult = await openKasirUseCase.execute(useCasePayload);

    openKasirResult.saldoAwal = request.payload.saldoAwal;

    const authData = await refreshAuthenticationUseCase.execute(refreshToken, authPayload);
    console.log('openKasirResult');
    await deleteAuthUseCase.execute({ refreshToken });
    console.log(openKasirResult);
    const response = h.response({
      status: 'success',
      auth: authData,
      data:
        openKasirResult,
    });
    response.code(201);

    return response;
  }

  async postCloseKasirHandler(request, h) {
    const authPayload = request.auth.credentials;
    console.log(authPayload);
    const useCasePayload = {
      idKasir: request.auth.credentials.idKasir,
      saldoAkhir: request.payload.saldoAkhir,
      keterangan: request.payload.keterangan,
    };

    const closeKasirUseCase = this._container.getInstance(CloseKasirUseCase.name);
    console.log(useCasePayload);
    const closeKasir = await closeKasirUseCase.execute(useCasePayload);
    console.log('closeKasir');
    console.log(closeKasir);
    const response = h.response({
      status: 'success',
      data:
        closeKasir,
    });
    response.code(201);
    return response;
  }

  async postKasDebitHandler(request, h) {
    const authPayload = request.auth.credentials;
    const useCasePayload = request.payload;
    const postDebitKasUseCase = this._container.getInstance(PostDebitKasUseCase.name);

    const postDebitKas = await postDebitKasUseCase.execute(useCasePayload, authPayload);

    const response = h.response({
      status: 'success',
      data:
          postDebitKas,
    });

    response.code(201);
    return response;
  }

  async postKasOutHandler(request, h) {
    const authPayload = request.auth.credentials;
    const useCasePayload = request.payload;

    console.log('masuk handler kas out');
    console.log(useCasePayload);
    console.log(authPayload);

    const postKasOutUseCase = this._container.getInstance(PostCreditKasUseCase.name);

    const postKasOut = await postKasOutUseCase.execute(useCasePayload, authPayload);

    const response = h.response({
      status: 'success',
      data:
          postKasOut,
    });

    response.code(201);
    return response;
  }
  // async postCommentHandler(request, h) {
  //     const usecasePayload = {
  //         content: request.payload.content,
  //         threadId: request.params.threadId,
  //         owner: request.auth.credentials.id,
  //     };

  //     const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
  //     const addedComment = await addCommentUseCase.execute(usecasePayload);

  //     const response = h.response({
  //         status: "success",
  //         data: {
  //             addedComment,
  //         },
  //     });
  //     response.code(201);
  //     return response;
  // }
  // async deleteCommentHandler(request, h) {
  //     const usecasePayload = {
  //         commentId: request.params.commentId,
  //         threadId: request.params.threadId,
  //     };
  //     const owner = request.auth.credentials.id;
  //     const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
  //     const deleteComment = await deleteCommentUseCase.execute(owner, usecasePayload);

  //     const response = h.response(
  //         deleteComment
  //     );
  //     response.code(200);
  //     return response;
  // }
}
module.exports = KasirHandler;
