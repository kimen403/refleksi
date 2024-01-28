// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class PostCreditKasUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({
    transaksiRepository, pegawaiRepository, kasirRepository, idGenerator,
  }) {
    this._transaksiRepository = transaksiRepository;
    this._pegawaiRepository = pegawaiRepository;
    this._kasirRepository = kasirRepository;
    this._idGenerator = idGenerator;
  }

  async execute(useCasePayload, authPayload) {
    const { idKasir, id } = authPayload;
    // clg('authPayload', authPayload);
    const {
      keterangan, jenis, nominal, idPegawai,
    } = useCasePayload;
    console.log('idKasir', idKasir);

    switch (jenis.toUpperCase()) {
      case 'BIAYA OPERASIONAL': {
        const date = new Date().toISOString();
        const idTR = `TROP-${date}-${this._idGenerator(5)}`;
        const useCase = {
          idKasir,
          reduceSaldo: nominal,
        };
        await this._kasirRepository.verifyAvailableKasir(idKasir);
        await this._kasirRepository.reduceSaldo(useCase);
        const newTransaksi = {
          idPegawai,
          idKasir,
          adminId: id,
          keterangan,
          type: 'out',
          coa: 'BIAYA OPERASIONAL',
          paymentType: 'CASH',
          totalHarga: nominal,
          subTotal: nominal,
        };
        console.log('masuk biaya operasional');

        const addedTransaksi = await this._transaksiRepository.addTransaksi(idTR, newTransaksi, idKasir);
        return addedTransaksi;
      }
      case 'KASBON': {
        const useCase = {
          idKasir,
          reduceSaldo: nominal,
        };
        console.log('masuk kasbon');
        await this._kasirRepository.verifyAvailableKasir(idKasir);
        await this._pegawaiRepository.verifyAvailablePegawai(idPegawai);
        await this._pegawaiRepository.reduceSaldoPegawai(idPegawai, nominal);
        await this._kasirRepository.reduceSaldo(useCase);
        const date = new Date().toISOString();
        const idTR = `TRKB-${date}-${this._idGenerator(5)}`;
        const newTransaksi = {
          memberId : idPegawai,
          idKasir,
          adminId: id,
          keterangan,
          type: 'out',
          coa: 'KASBON',
          paymentType: 'CASH',
          totalHarga: nominal,
          subTotal: nominal,
        };
        const addedTransaksi = await this._transaksiRepository.addTransaksi(idTR, newTransaksi, idKasir);
        return addedTransaksi;
      }

      default: {
        return 'error';
      }
    }
  }
}

module.exports = PostCreditKasUseCase;
