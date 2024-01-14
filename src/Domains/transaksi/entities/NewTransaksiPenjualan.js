// const payload = {
//   memberId: 'member-123',
//   paymentType: 'Cash',
//   diskonPercent: 10,
//   listItems: {
//     barang: [
//       {
//         productId: 'barang-123',
//         qty: 1,
//       },

//     ],
//     jasa: [
//       {
//         jasaId: 'jasa-123',
//         idPegawai: 'pegawai-123',
//         qty: 1,
//       },
//       {
//         jasaId: 'jasa-1234',
//         qty: 1,
//       },
//     ],
//   },
// };

class NewTransaksiPenjualan {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      idKasir,
      memberId, paymentType, diskonPercent, listItems,
    } = payload;
    // ada 9 properti
    this.idKasir = idKasir;
    this.memberId = memberId;
    this.paymentType = paymentType;
    this.diskonPercent = diskonPercent;
    this.listItems = listItems;
  }

  _verifyPayload(payload) {
    const {
      paymentType, diskonPercent, listItems,
    } = payload;

    if (!paymentType || !listItems) {
      throw new Error('NEW_TRANSAKSI_PENJUALAN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof paymentType !== 'string' || typeof diskonPercent !== 'number' || typeof listItems !== 'object') {
      throw new Error('NEW_TRANSAKSI_PENJUALAN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewTransaksiPenjualan;
