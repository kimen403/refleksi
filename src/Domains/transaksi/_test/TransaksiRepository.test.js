// const ThreadRepository = require('../ThreadRepository');

const TransaksiRepository = require('../TransaksiRepository');

describe('a Transaksi Repository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const repository = new TransaksiRepository();

    // Action and Assert
    await expect(repository.addTransaksi({})).rejects.toThrowError(
      'TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.verifyAvailableTransaksi('')).rejects.toThrowError(
      'TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(repository.getTransaksiById('')).rejects.toThrowError(
      'TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(repository.getAllTransaksi()).rejects.toThrowError(
      'TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(repository.deleteTransaksi('')).rejects.toThrowError(
      'TRANSAKSI_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
