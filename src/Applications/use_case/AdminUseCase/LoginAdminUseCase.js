const AdminLogin = require('../../../Domains/admin/entities/AdminLogin');
const NewAuthentication = require('../../../Domains/authentications/entities/NewAuth');

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

    const encryptedPassword = await this._adminRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);

    const { id, fullname } = await this._adminRepository.getIdByUsername(username);

    const role = await this._adminRepository.getRoleByUsername(username);
    const isKasirOpen = await this._adminRepository.isKasirOpen(id);

    let idKasir;
    if (!isKasirOpen) {
      idKasir = 'null';
    } else {
      idKasir = await this._adminRepository.getIdKasir(id);
    }

    const token = await this._authenticationTokenManager
      .createAccessToken({
        username, id, role, isKasirOpen, idKasir,
      });
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({
        username, id, role, isKasirOpen, idKasir,
      });

    const newAuthentication = new NewAuthentication({
      id,
      username,
      fullname,
      token,
      isKasirOpen,
      idKasir,
      role,
      refreshToken,
    });

    await this._authenticationRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
