const AdminRepository = require('../AdminRepository');

describe('AdminRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new AdminRepository();

    // Action and Assert
    await expect(userRepository.addAdmin({})).rejects.toThrow('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.verifyAvailableUsername('')).rejects.toThrow('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getPasswordByUsername('')).rejects.toThrow('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getIdByUsername('')).rejects.toThrow('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getRoleByUsername('')).rejects.toThrow('ADMIN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
