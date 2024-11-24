const autoBind = require("auto-bind");
const LoginUserUseCase = require("../../../../Applications/use_case/AdminUseCase/LoginAdminUseCase");
const RefreshAuthenticationUseCase = require("../../../../Applications/use_case/Auth_UseCase/RefreshAuthenticationUseCase");
const LogoutUserUseCase = require("../../../../Applications/use_case/AdminUseCase/LogoutUserUseCase");

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const authData = await loginUserUseCase.execute(request.payload);

    const response = h.response({
      status: "success",
      data: authData,
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    const refreshAuthenticationUseCase = this._container.getInstance(
      RefreshAuthenticationUseCase.name
    );
    const authData = request.auth.credentials;

    const { refreshToken } = request.payload;
    const token = await refreshAuthenticationUseCase.execute(
      refreshToken,
      authData
    );

    return {
      status: "success",
      data: token,
    };
  }

  async deleteAuthenticationHandler(request, h) {
    console.log(request.payload);
    const logoutUserUseCase = this._container.getInstance(
      LogoutUserUseCase.name
    );
    await logoutUserUseCase.execute(request.payload);

    return {
      status: "success",
    };
  }
}

module.exports = AuthenticationsHandler;
