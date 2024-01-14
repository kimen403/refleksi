class AdminRepository {
  async addAdmin(registerUser) {
    throw new Error('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableUsername(username) {
    throw new Error('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getPasswordByUsername(username) {
    throw new Error('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getIdByUsername(username) {
    throw new Error('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRoleByUsername(username) {
    throw new Error('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AdminRepository;
