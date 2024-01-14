// const ThreadRepository = require('../ThreadRepository');

const ProductRepository = require('../ProductRepository');

describe('a Product Repository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const productRepository = new ProductRepository();

    // Action and Assert
    await expect(productRepository.addProduct({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(productRepository.editProduct({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(productRepository.deleteProduct({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(productRepository.addStock({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(productRepository.minusStock({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(productRepository.verifyAvailableProduct({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(productRepository.verifyAvailableStock({})).rejects.toThrowError(
      'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
