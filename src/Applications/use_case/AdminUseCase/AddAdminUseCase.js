const RegisterAdmin = require('../../../Domains/admin/entities/RegisterAdmin');

class AddAdminUseCase {
  constructor({ adminRepository, passwordHash }) {
    this._adminRepository = adminRepository;
    this._passwordHash = passwordHash;
  }

  async execute(payload) {
    const useCasePayload = {
      username: payload.username,
      password: payload.password,
      fullname: payload.fullname,
      role: payload.role,
    };
    const registerAdmin = new RegisterAdmin(useCasePayload);
    await this._adminRepository.verifyAvailableUsername(registerAdmin.username);
    // console.log('aman');
    registerAdmin.password = await this._passwordHash.hash(registerAdmin.password);
    return this._adminRepository.addAdmin(registerAdmin);
  }
}

module.exports = AddAdminUseCase;
