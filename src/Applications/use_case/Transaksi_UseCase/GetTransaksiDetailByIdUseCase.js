// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetTransaksiDetailByIdUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ transaksiDetailRepository }) {
    this._transaksiDetailRepository = transaksiDetailRepository;
  }

  async execute(id) {
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);
    if (!id) {
      throw new Error('GET_TRANSAKSI_DETAIL_BY_ID.NOT_CONTAIN_ANY_ID');
    }

    await this._transaksiDetailRepository.verifyAvailableTransaksi(id);
    // console.log('masuk usecase get transaksi detail by id');
    const transaksiDetail = await this._transaksiDetailRepository.getDetailPenjualanById(id);

    // Assuming transaksiDetail is an array containing objects
    const result = { jasa: [], barang: [] }; // Initialize the result object with empty arrays

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < transaksiDetail.length; i++) { // Loop through each item in transaksiDetail
      const items = transaksiDetail[i]; // Get the current item object

      if (items.jenis === 'JASA') { // Use strict equality comparison with ===
        result.jasa.push({
          id: items.id,
          idJasa: items.jasaId,
          namaJasa: items.nama,
          namaPegawai: items.namaPegawai,
          unitPrice: items.unitPrice,
          qty: items.qty,
          subTotal: items.subTotal,
        }); // Push the current item to the jasa array in result
      } else {
        result.barang.push({
          id: items.id,
          idBarang: items.productId,
          namaBarang: items.namaBarang,
          unitPrice: items.unitPrice,
          qty: items.qty,
          subTotal: items.subTotal,
        }); // Push the current item to the barang array in result
      }
    }
    return result;
  }
}

module.exports = GetTransaksiDetailByIdUseCase;
