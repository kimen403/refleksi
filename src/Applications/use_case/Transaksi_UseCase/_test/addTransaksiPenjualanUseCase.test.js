// const NewComment = require('../../../../Domains/comments/entities/NewComment');
// const AddedComment = require('../../../../Domains/comments/entities/AddedComment');
// const CommentRepository = require('../../../../Domains/comments/CommentRepository');
// const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
// const AddCommentUseCase = require('../AddCommentUseCase');

const JasaTableTestHelper = require('../../../../../tests/JasaTableTestHelper');
const ProductTableTestHelper = require('../../../../../tests/ProductTableHelper');
const JasaRepository = require('../../../../Domains/jasa/JasaRepository');
const ProductRepository = require('../../../../Domains/product/ProductRepository');
const TransaksiDetailRepository = require('../../../../Domains/transaksi/TransaksiDetailRepository');
const TransaksiRepository = require('../../../../Domains/transaksi/TransaksiRepository');
const AddTransaksiPenjualanUseCase = require('../AddTransaksiPenjualanUseCase');

describe('addTransaksiPenjualanUseCase', () => {
  it('should orchestrating the action correctly', async () => {
    //     // Arrange
    // await ProductTableTestHelper.addProduct({ id: 'product-123', price: 5000 });
    // await JasaTableTestHelper.addJasa({ id: 'jasa-123', price: 5000 });
    const authPayload = {
      users: 'user-123',
      username: 'dicoding',
    };
    const useCasePayload = {
      memberId: 'member-123',
      paymentType: 'Cash',
      diskonPercent: 10,
      listItems: {
        barang: [
          {
            productId: 'product-123',
            qty: 2,
          },
        ],
        jasa: [
          {
            jasaId: 'jasa-123',
            idPegawai: 'pegawai-123',
            qty: 1,
          },
          {
            jasaId: 'jasa-1234',
            idPegawai: 'pegawai-1234',
            qty: 1,
          },
        ],
      },
    };

    //     const expectedAddedComment = {
    //         id: 'comment-123',
    //         content: useCasePayload.content,
    //         owner: useCasePayload.owner,
    //     };

    //     /** creating dependency of use case */,
    const mockIdGenerator = () => '123';
    const mockTransaksiDetailRepository = new TransaksiDetailRepository();
    const mockTransaksiRepository = new TransaksiRepository();
    const mockProductRepository = new ProductRepository();
    const mockJasaRepository = new JasaRepository();
    //     const mockThreadRepository = new ThreadRepository();

    //     /** mocking needed function */

    //         //Update-setelah di review
    mockJasaRepository.verifyAvailableJasa = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockProductRepository.verifyAvailableProduct = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockProductRepository.verifyAvailableStock = jest.fn()
      .mockImplementation(() => Promise.resolve());

    mockTransaksiDetailRepository.addDetailPenjualanBarang = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: 'detail-123', subTotal: 10000 }));
    mockTransaksiDetailRepository.addDetailPenjualanJasa = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: 'detail-123', subTotal: 10000 }));

    mockTransaksiRepository.addTransaksi = jest.fn()
      .mockImplementation((_, data) => Promise.resolve({
        data,
      }));
    mockProductRepository.minusStock = jest.fn()
      .mockImplementation(() => Promise.resolve());

    //         //Update-Setelah di review
    //     mockTransaksiDetaiRepository.mockFucntion = jest.fn()
    //         .mockImplementation(() => Promise.resolve(expectedAddedComment));

    const addTransaksiPenjualanUseCase = new AddTransaksiPenjualanUseCase({
      transaksiRepository: mockTransaksiRepository,
      transaksiDetailRepository: mockTransaksiDetailRepository,
      productRepository: mockProductRepository,
      jasaRepository: mockJasaRepository,
      idGenerator: mockIdGenerator,
    });

    // Action
    const addedTransaksi = await addTransaksiPenjualanUseCase.execute(useCasePayload, authPayload);

    // Assert
    expect(addedTransaksi).toStrictEqual({
      data: {
        id: '123',
        memberId: useCasePayload.memberId,
        type: 'Debit',
        tanggal: '2021-08-31',
      },

    });

    //     expect(addedComment).toStrictEqual(new AddedComment(expectedAddedComment));

    //     expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.threadId);

    //     expect(mockCommentRepository.addComment).toBeCalledWith(
    //         new NewComment({
    //             content: useCasePayload.content,
    //             threadId: useCasePayload.threadId,
    //             owner: useCasePayload.owner,
    //         }),
    //     );
  });
});
