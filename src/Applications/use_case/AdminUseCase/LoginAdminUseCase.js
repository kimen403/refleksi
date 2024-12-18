const AdminLogin = require("../../../Domains/admin/entities/AdminLogin");
const NewAuthentication = require("../../../Domains/authentications/entities/NewAuth");

class LoginUserUseCase {
  constructor({
    adminRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._adminRepository = adminRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new AdminLogin(useCasePayload);

    const encryptedPassword = await this._adminRepository.getPasswordByUsername(
      username
    );

    await this._passwordHash.comparePassword(password, encryptedPassword);

    const { id, fullname } = await this._adminRepository.getIdByUsername(
      username
    );

    const role = await this._adminRepository.getRoleByUsername(username);
    console.log(role);
    const token = await this._authenticationTokenManager.createAccessToken({
      role,
      username,
      id,
    });
    const refreshToken =
      await this._authenticationTokenManager.createRefreshToken({
        role,
        username,
        id,
      });

    const newAuthentication = new NewAuthentication({
      id,
      username,
      fullname,
      token,
      role,
      refreshToken,
    });

    await this._authenticationRepository.addToken(
      newAuthentication.refreshToken
    );

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
