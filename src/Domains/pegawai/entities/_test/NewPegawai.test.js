/*! !!! ISI PAYLOAD YANG DI BUTUHKAN DARI CLIENT :::
payload = {
    nama: 'Pegawai 1',
      jenisKelamin: 'L',
      nik: '1234567890123456',
      tanggalLahir: '2021-08-08T07:22:33.555Z',
      alamat: 'Jl. Pegawai 1',
      noHp: '081234567890',
      email: 'a@gmail.com',
      foto: 'image.jpg',
    };
*/

const NewPegawai = require('../NewPegawai');

describe('a NewPegawai entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      nama: 'Pegawai 1',
      jenisKelamin: 'L',
      nik: '1234567890123456',
      tanggalLahir: '2021-08-08T07:22:33.555Z',
      alamat: 'Jl. Pegawai 1',

    };
    expect(() => new NewPegawai(payload)).toThrow('NEW_PEGAWAI.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type spesification', () => {
    const payload = {
      nama: 'Pegawai 1',
      jenisKelamin: 'L',
      nik: 1234567890123456,
      tanggalLahir: '2021-08-08T07:22:33.555Z',
      alamat: 'Jl. Pegawai 1',
      noHp: '081234567890',
      email: 'a@gmail.com',
      foto: 'image.jpg',

    };
    expect(() => new NewPegawai(payload)).toThrow('NEW_PEGAWAI.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should success create NewPegawai Object', () => {
    const payload = {
      nama: 'Pegawai 1',
      jenisKelamin: 'L',
      nik: '1234567890123456',
      tanggalLahir: '2021-08-08T07:22:33.555Z',
      alamat: 'Jl. Pegawai 1',
      noHp: '081234567890',
      email: 'a@gmail.com',
      foto: 'image.jpg',
    };

    const {
      nama, jenisKelamin, nik, tanggalLahir, alamat, noHp, email, foto,
    } = new NewPegawai(payload);

    expect(nama).toEqual(payload.nama);
    expect(jenisKelamin).toEqual(payload.jenisKelamin);

    expect(tanggalLahir).toEqual(payload.tanggalLahir);
    expect(alamat).toEqual(payload.alamat);
    expect(noHp).toEqual(payload.noHp);
    expect(email).toEqual(payload.email);
    expect(foto).toEqual(payload.foto);

    // expect(id).toEqual(payload.id);
    // expect(content).toEqual(payload.content);
    // expect(owner).toEqual(payload.owner);
    // expect(threadId).toEqual(payload.thread_id);
  });
});
