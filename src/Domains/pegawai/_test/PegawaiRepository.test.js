// const ThreadRepository = require('../ThreadRepository');

const PegawaiRepository = require('../PegawaiRepository');

describe('a PegawaiRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const repository = new PegawaiRepository();

    // Action and Assert
    await expect(repository.addPegawai({})).rejects.toThrowError(
      'PEGAWAI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.verifyAvailablePegawai({})).rejects.toThrowError(
      'PEGAWAI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.getPegawaiById({})).rejects.toThrowError(
      'PEGAWAI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.getPegawai({})).rejects.toThrowError(
      'PEGAWAI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.getSaldoPegawai({})).rejects.toThrowError(
      'PEGAWAI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
