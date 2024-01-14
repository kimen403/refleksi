// const ThreadRepository = require('../ThreadRepository');

const JasaRepository = require('../JasaRepository');

describe('a Jasa Repository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const repository = new JasaRepository();

    // Action and Assert
    await expect(repository.addJasa({})).rejects.toThrowError(
      'JASA_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.editJasa({})).rejects.toThrowError(
      'JASA_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.deleteJasa({})).rejects.toThrowError(
      'JASA_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.getJasaById({})).rejects.toThrowError(
      'JASA_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.getJasa({})).rejects.toThrowError(
      'JASA_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.verifyAvailableJasa({})).rejects.toThrowError(
      'JASA_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
