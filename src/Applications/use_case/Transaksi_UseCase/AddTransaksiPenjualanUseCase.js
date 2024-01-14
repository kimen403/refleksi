/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

// const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NewTransaksi = require('../../../Domains/transaksi/entities/NewTransaksiPenjualan');

class AddTransaksiPenjualanUseCase {
  constructor({
    transaksiRepository, transaksiDetailRepository, idGenerator, productRepository, jasaRepository, pegawaiRepository, kasirRepository,
  }) {
    this._transaksiRepository = transaksiRepository;
    this._transaksiDetailRepository = transaksiDetailRepository;
    this._idGenerator = idGenerator;
    this._productRepository = productRepository;
    this._jasaRepository = jasaRepository;
    this._pegawaiRepository = pegawaiRepository;
    this._kasirRepository = kasirRepository;
  }

  async execute(useCasePayload, authPayload) {
    const newTransaksi = new NewTransaksi(useCasePayload);
    console.log(newTransaksi);
    // console.log('usecase add transaksi penjualan');
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const idPenjualan = `PJ-${date}-${this._idGenerator(4)}`;
    const type = 'in';
    const coa = 'PENJUALAN';
    const { idKasir } = useCasePayload;

    const { listItems } = newTransaksi;

    let subTotal = 0;
    const items = listItems;

    // NOTE - verifyAvailableProduct & verifyAvailableStock
    for (const item of items.barang) {
      await this._productRepository.verifyAvailableProduct(item.productId);
      await this._productRepository.verifyAvailableStock(item.productId, item.qty);
    }
    // jasa
    // NOTE - verifyAvailableJasa
    for (const item of items.jasa) {
      // console.log('jasaID:', item.jasaId);
      await this._jasaRepository.verifyAvailableJasa(item.jasaId);
      const subTotallist = await this._transaksiDetailRepository.addDetailPenjualanJasa(idPenjualan, item);
      subTotal += subTotallist.subTotal;
    }
    // barang
    for (const item of items.barang) {
      const subTotallist = await this._transaksiDetailRepository.addDetailPenjualanBarang(idPenjualan, item);
      // console.log('subTotallist', subTotallist);
      subTotal += subTotallist.subTotal;
    }
    // console.log(items.jasa);
    const diskonPercent = 1 - (newTransaksi.diskonPercent / 100);
    const totalHarga = subTotal * diskonPercent;

    // const diskon = (subTotal - totalHarga) / subTotal;
    // 9 yang diisi
    const newTransaksiData = {
      ...newTransaksi,
      idPenjualan, // masuk ke keterangan
      type,
      coa,
      tanggal: new Date().toISOString(),
      subTotal,
      keterangan: 'PENJUALAN',
      totalHarga,
      adminId: authPayload.id,
    };

    // console.log('newTransaksiData', newTransaksiData);
    const addedTransaksi = await this._transaksiRepository.addTransaksi(idPenjualan, newTransaksiData, idKasir);

    for (const item of items.barang) {
      await this._productRepository.minusStock(item.productId, item.qty);
    }

    for (const item of items.jasa) {
      console.log(item.idPegawai);
      const nominal = await this._jasaRepository.getJasaPriceById(item.jasaId);
      console.log('nominal', nominal);
      const debit = nominal.price * item.qty * 0.5;
      await this._pegawaiRepository.addSaldoPegawai(item.idPegawai, debit);
    }

    await this._kasirRepository.updateSaldoKasir(idKasir, totalHarga);
    console.log(listItems);
    return addedTransaksi;
  }
}

module.exports = AddTransaksiPenjualanUseCase;
