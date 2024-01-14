// //import TEST HELPER
// const UserTableTestHelper = require('../../../../tests/UsersTableTestHelper');
// const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
// // Import Unit Test Library
// const ThreadRepositoryPostgres = require('../ThreadRespositoryPostgres');
// Import Domain Model
// const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
// const NewThread = require('../../../Domains/threads/entities/NewThread');
// const AddedThread = require('../../../Domains/threads/entities/AddedThread');
// Import Connection Pool Library
const ProductTableTestHelper = require('../../../../tests/ProductTableHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const pool = require('../../database/postgres/pool');
const ProductRepositoryPostgres = require('../ProductRepositoryPostgres');

describe('ProductRepositoryPostgres', () => {
  afterEach(async () => {
    // await ThreadTableTestHelper.cleanTable();
    // await UserTableTestHelper.cleanTable();
    await ProductTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addProduct function', () => {
    it('should persist new thread and return added thread correctly', async () => {
      // Arrange

      const newProduct = {
        productId: 'Product001',
        barcode: 'P-001',
        productName: 'Product 1',
        unitId: 1,
        categoryId: 1,
        stockNow: 10,
        stockMin: 5,
        unitPrice: 100000,
        hargaBeli: 50000,

      };

      const fakeIdGenerator = () => '321';
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, fakeIdGenerator);

      // Action

      const addedProduct = await productRepositoryPostgres.addProduct(newProduct);

      // Assert

      const products = await ProductTableTestHelper.findProductById(addedProduct);
      expect(addedProduct).toStrictEqual(
        addedProduct,
      );
      expect(products).toHaveLength(1);
    });

    it('should return added Product correctly', async () => {
      // Arrange

      const newProduct = {
        productId: 'Product001',
        barcode: 'P-001',
        productName: 'Product 1',
        unitId: 1,
        categoryId: 1,
        stockNow: 10,
        stockMin: 5,
        unitPrice: 100000,
        hargaBeli: 50000,

      };

      const fakeIdGenerator = () => '321';
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, fakeIdGenerator);

      // Action

      const addedProduct = await productRepositoryPostgres.addProduct(newProduct);

      // Assert
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const productId = `P-321-${date}`;
      expect(addedProduct).toStrictEqual(
        productId,
      );
    });
  });

  describe('getAllProduct function', () => {
    // arrange

    it('should return thread correctly', async () => {
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, {});
      await ProductTableTestHelper.addProduct({});
      const product = await productRepositoryPostgres.getAllProduct();

      expect(product).toStrictEqual([{
        productId: 'Product001',
        barcode: 'P-001',
        name: 'Product 1',
        stock: 10,
        price: 100000,
        image: 'image.jpg',
        satuan: 'pcs',
        category: 'Jasa',
      }]);
    });
  });

  describe('getProductById function', () => {
    // arrange
    it('should throw NotFoundError when product not found', async () => {
      // Arrange
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(productRepositoryPostgres.getProductById('Product001')).rejects.toThrowError('Product tidak ditemukan');
    });
    it('should return thread correctly', async () => {
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, {});
      await ProductTableTestHelper.addProduct({});

      const product = await productRepositoryPostgres.getProductById('Product001');

      expect(product).toStrictEqual({
        productId: 'Product001',
        barcode: 'P-001',
        name: 'Product 1',
        unitId: 1,
        category: 1,
        stock: 10,
        stockMin: 5,
        unitPrice: 100000,
        image: 'image.jpg',

      });
    });
  });

  // describe('addThread function', () => {
  //   it('should persist new thread and return added thread correctly', async () => {
  //     // Arrange
  //     await UserTableTestHelper.addUser({
  //       username: 'dicoding',
  //       password: 'secret_password',

  //     });
  //     const newThread = new NewThread({
  //       title: 'Dicoding Indonesia',
  //       body: 'Dicoding Indonesia adalah platform belajar pemrograman online terbaik di Indonesia',
  //       owner: 'user-123',
  //     });

  //     const fakeIdGenerator = () => '321';
  //     const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

  //     // Action
  //     const addedThread = await threadRepositoryPostgres.addThread(newThread);

  //     // Assert
  //     const threads = await ThreadTableTestHelper.findThreadsById('thread-321');
  //     expect(addedThread).toStrictEqual(
  //       new AddedThread({
  //         id: 'thread-321',
  //         title: 'Dicoding Indonesia',
  //         owner: 'user-123',
  //       }),
  //     );
  //     expect(threads).toHaveLength(1);
  //   });

  //   it('should return added thread correctly', async () => {
  //     // Arrange
  //     await UserTableTestHelper.addUser({
  //       username: 'dicoding',
  //       password: 'secret_password',
  //     });
  //     const newThreadPayload = {
  //       title: 'Dicoding Indonesia',
  //       body: 'Dicoding Indonesia adalah platform belajar pemrograman online terbaik di Indonesia',
  //       owner: 'user-123',
  //     };
  //     const newThread = new NewThread(newThreadPayload);

  //     const fakeIdGenerator = () => '321';
  //     const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

  //     // Action
  //     const addedThread = await threadRepositoryPostgres.addThread(newThread);

  //     // Assert
  //     expect(addedThread).toStrictEqual(
  //       new AddedThread({
  //         id: 'thread-321',
  //         title: 'Dicoding Indonesia',
  //         owner: 'user-123',
  //       }),
  //     );
  //   });
  // });

  // describe('getThreadById function', () => {
  //   //arrange
  //   it('should throw NotFoundError when thread not found', async () => {
  //     // Arrange
  //     const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

  //     // Action & Assert
  //     await expect(threadRepositoryPostgres.getThreadById('thread-456')).rejects.toThrowError(NotFoundError);
  //   });
  //   it('should return thread correctly', async () => {
  //     const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
  //     await UserTableTestHelper.addUser({});
  //     await ThreadTableTestHelper.addThread({});
  //     const thread = await threadRepositoryPostgres.getThreadById('thread-123');

  //     expect(thread).toStrictEqual({
  //       id: 'thread-123',
  //       title: 'sebuah thread',
  //       body: 'sebuah body',
  //       date: '2023-04-07T07:12:01.430Z',
  //       username: 'dicoding',
  //     });
  //   });
  // });

  // describe('verifyAvailableThread function', () => {

  //   it('should throw NotFoundError when thread not found', async () => {
  //     // Arrange
  //     const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

  //     // Action & Assert
  //     await expect(threadRepositoryPostgres.verifyAvailableThread('thread-456')).rejects.toThrowError(NotFoundError);
  //   });

  //   it('should return thread correctly', async () => {
  //     const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
  //     await UserTableTestHelper.addUser({});
  //     await ThreadTableTestHelper.addThread({});
  //     const thread = await threadRepositoryPostgres.verifyAvailableThread('thread-123');

  //     expect(thread).toBe(true);
  //   });
  // });
});
