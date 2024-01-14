// const ThreadRepository = require('../ThreadRepository');

const TransaksiDetailRepository = require('../TransaksiDetailRepository');

describe('a Transaksi Detail Repository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const repository = new TransaksiDetailRepository();

    // Action and Assert
    await expect(repository.addDetailPenjualanBarang({})).rejects.toThrowError(
      'TRANSAKSI_DETAIL_PENJUALAN.METHOD_NOT_IMPLEMENTED',
    );
    await expect(repository.addDetailPenjualanJasa({})).rejects.toThrowError(
      'TRANSAKSI_DETAIL_PENJUALAN.METHOD_NOT_IMPLEMENTED',
    );
  });
});
