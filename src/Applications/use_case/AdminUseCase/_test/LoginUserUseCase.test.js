const AdminRepository = require('../../../../Domains/admin/AdminRepository');
const AuthenticationRepository = require('../../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../../security/AuthenticationTokenManager');
const PasswordHash = require('../../../security/PasswordHash');
const LoginAdminUseCase = require('../LoginAdminUseCase');
const NewAuth = require('../../../../Domains/authentications/entities/NewAuth');

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
    };
    const mockedAuthentication = new NewAuth({
      username: 'dicoding',
      token: 'access_token',
      refreshToken: 'refresh_token',
      role: 'ADMIN',
    });
    const mockUserRepository = new AdminRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.token));
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.refreshToken));
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: 'user-123', fullname: 'Dicoding Indonesia' }));
    mockUserRepository.getRoleByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('ADMIN'));
    mockAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve('token'));

    // create use case instance
    const loginUserUseCase = new LoginAdminUseCase({
      adminRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toEqual(new NewAuth({
      id: 'user-123',
      fullname: 'Dicoding Indonesia',
      token: 'access_token',
      refreshToken: 'refresh_token',
      role: 'ADMIN',
      username: 'dicoding',

    }));
    expect(mockUserRepository.getPasswordByUsername)
      .toHaveBeenCalledWith('dicoding');
    expect(mockPasswordHash.comparePassword)
      .toHaveBeenCalledWith('secret', 'encrypted_password');
    expect(mockUserRepository.getIdByUsername)
      .toHaveBeenCalledWith('dicoding');
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toHaveBeenCalledWith({ username: 'dicoding', id: 'user-123', role: 'ADMIN' });
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toHaveBeenCalledWith({ username: 'dicoding', id: 'user-123', role: 'ADMIN' });
    expect(mockAuthenticationRepository.addToken)
      .toHaveBeenCalledWith(mockedAuthentication.refreshToken);
  });
});
