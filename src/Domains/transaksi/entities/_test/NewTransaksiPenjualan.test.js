/*! !!! ISI PAYLOAD YANG DI BUTUHKAN DARI CLIENT :::
payload = {
     memberId: 'member-123',
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
    };
*/

const NewTransaksiPenjualan = require('../NewTransaksiPenjualan');

describe('a NewTransaksiPenjualan entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      memberId: 'member-123',

      listItems: {
        barang: [
          {
            productId: 'barang-123',
            qty: 1,
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
            qty: 1,
          },
        ],
      },
    };
    expect(() => new NewTransaksiPenjualan(payload)).toThrow('NEW_TRANSAKSI_PENJUALAN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type spesification', () => {
    const payload = {
      memberId: 'member-123',
      paymentType: 'Cash',
      diskonPercent: '10',
      listItems: {
        barang: [
          {
            productId: 'barang-123',
            qty: 1,
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
            qty: 1,
          },
        ],
      },

    };
    expect(() => new NewTransaksiPenjualan(payload)).toThrow('NEW_TRANSAKSI_PENJUALAN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should success create NewTransaksiPenjualan Object', () => {
    const payload = {
      memberId: 'member-123',
      paymentType: 'Cash',
      diskonPercent: 10,
      listItems: {
        barang: [
          {
            productId: 'barang-123',
            qty: 1,
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
            qty: 1,
          },
        ],
      },

    };

    const {
      memberId, paymentType, diskonPercent, listItems,
    } = new NewTransaksiPenjualan(payload);

    expect(memberId).toEqual(payload.memberId);
    expect(paymentType).toEqual(payload.paymentType);
    expect(diskonPercent).toEqual(payload.diskonPercent);
    expect(listItems).toEqual(payload.listItems);
  });
});
