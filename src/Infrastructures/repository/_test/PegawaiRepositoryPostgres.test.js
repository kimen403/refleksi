// Import Connection Pool Library
const JasaTableTestHelper = require('../../../../tests/JasaTableTestHelper');
const PegawaiTableTestHelper = require('../../../../tests/PegawaiTableHelper');

const NewPegawai = require('../../../Domains/pegawai/entities/NewPegawai');
const pool = require('../../database/postgres/pool');
const PegawaiRepositoryPostgres = require('../PegawaiRepositoryPostgres');

describe('PegawaiRepositoryPostgres', () => {
  afterEach(async () => {
    await PegawaiTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addPegawai function', () => {
    it('should persist new thread and return added thread correctly', async () => {
      // Arrange
    //   await UserTableTestHelper.addUser({
    //     username: 'dicoding',
    //     password: 'secret_password',

      //   });
      const newPegawai = new NewPegawai({
        id: 'Pegawai001',
        nama: 'Pegawai 1',
        jenisKelamin: 'L',

        tanggalLahir: '2021-08-08T07:22:33.555Z',
        alamat: 'Jl. Pegawai 1',
        noHp: '081234567890',
        email: 'a@gmail.com',
        foto: 'image',
        status: true,
        createdAt: '2021-08-08T07:22:33.555Z',
        updatedAt: '2021-08-08T07:22:33.555Z',
      });

      const fakeIdGenerator = () => '321';
      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedPegawai = await pegawaiRepositoryPostgres.addPegawai(newPegawai);

      // Assert
      const threads = await PegawaiTableTestHelper.findPegawaiById('pegawai-321');
      expect(addedPegawai).toStrictEqual(
        'pegawai-321',
      );
      expect(threads).toHaveLength(1);
    });

    it('should return added Jasa correctly', async () => {
      // Arrange
    //   await UserTableTestHelper.addUser({
    //     username: 'dicoding',
    //     password: 'secret_password',
    //   });
      const newJasaPayload = {
        id: 'Pegawai001',
        nama: 'Pegawai 1',
        jenisKelamin: 'L',

        tanggalLahir: '2021-08-08T07:22:33.555Z',
        alamat: 'Jl. Pegawai 1',
        noHp: '081234567890',
        email: 'a@gmail.com',
        foto: 'image.jpg',
        status: true,
        createdAt: '2021-08-08T07:22:33.555Z',
        updatedAt: '2021-08-08T07:22:33.555Z',
      };
      const newPegawai = new NewPegawai(newJasaPayload);

      const fakeIdGenerator = () => '321';
      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedPegawai = await pegawaiRepositoryPostgres.addPegawai(newPegawai);

      // Assert
      expect(addedPegawai).toStrictEqual(
        'pegawai-321',
      );
    });
  });

  describe('getPegawaiById function', () => {
    it('should throw NotFoundError when pegawai not found', async () => {
      // Arrange
      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(pegawaiRepositoryPostgres.getPegawaiById('pegawai-123')).rejects.toThrowError('Pegawai tidak ditemukan');
    });

    it('should return pegawai correctly', async () => {
      // Arrange
      const fakeIdGenerator = () => '321';
      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, fakeIdGenerator);
      await PegawaiTableTestHelper.addPegawai({ id: 'pegawai-123' });

      // Action
      const pegawai = await pegawaiRepositoryPostgres.getPegawaiById('pegawai-123');

      // Assert
      expect(pegawai).toStrictEqual({
        idPegawai: 'pegawai-123',
        nama: 'Pegawai 1',
        jenisKelamin: 'L',
        nik: '1234567890123456',
        tanggalLahir: '2021-08-08T07:22:33.555Z',
        alamat: 'Jl. Pegawai 1',
        noHp: '081234567890',
        email: 'a@gmail.com',
        foto: 'image.jpg',
        status: true,

      });
    });
  });

  describe('verifyAvailablePegawai function', () => {
    it('should throw NotFoundError when pegawai not found', async () => {
      // Arrange
      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, {});

      // Action & Assert

      await expect(pegawaiRepositoryPostgres.verifyAvailablePegawai('pegawai-123')).rejects.toThrowError('Pegawai tidak ditemukan');
    });

    it('should return pegawai correctly', async () => {
      // Arrange

      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, {});
      await PegawaiTableTestHelper.addPegawai({ id: 'pegawai-123' });

      // Action

      await pegawaiRepositoryPostgres.verifyAvailablePegawai('pegawai-123');

      // Assert
    });
  });

  describe('getAllPegawai function', () => {
    it('should return pegawai correctly', async () => {
      // Arrange
      const fakeIdGenerator = () => '321';
      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, fakeIdGenerator);
      await PegawaiTableTestHelper.addPegawai({ id: 'pegawai-123' });

      // Action

      const pegawai = await pegawaiRepositoryPostgres.getAllPegawai();

      // Assert

      expect(pegawai).toStrictEqual([{
        idPegawai: 'pegawai-123',
        nama: 'Pegawai 1',
        foto: 'image.jpg',
        status: true,
        email: 'a@gmail.com',
      }]);
    });
  });

  describe('deletePegawaiById function', () => {
    it('should return pegawai correctly', async () => {
      // Arrange

      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, {});
      await PegawaiTableTestHelper.addPegawai({ id: 'pegawai-123' });

      // Action

      await pegawaiRepositoryPostgres.deletePegawaiById('pegawai-123');

      // Assert

      const pegawai = await pegawaiRepositoryPostgres.getAllPegawai();

      expect(pegawai).toStrictEqual([]);
    });
  });

  describe('verifyAvailableNik function', () => {
    it('should throw InvariantError when nik not available', async () => {
      // Arrange
      const fakeIdGenerator = () => '321';
      const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, fakeIdGenerator);

      // Action & Assert
      await PegawaiTableTestHelper.addPegawai({
        nik: '1234567890123456',
      });
      await expect(pegawaiRepositoryPostgres.verifyAvailableNik('1234567890123456')).rejects.toThrowError('NIK_ALREADY_EXISTS');

      // Assert
    });
  });

  // describe('getThreadById function', () => {
  //   //arrange
  //   it('should throw NotFoundError when thread not found', async () => {
  //     // Arrange
  //     const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, {});

  //     // Action & Assert
  //     await expect(pegawaiRepositoryPostgres.getThreadById('thread-456')).rejects.toThrowError(NotFoundError);
  //   });
  //   it('should return thread correctly', async () => {
  //     const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, {});
  //     await UserTableTestHelper.addUser({});
  //     await JasaTableTestHelper.addThread({});
  //     const thread = await pegawaiRepositoryPostgres.getThreadById('thread-123');

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
  //     const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, {});

  //     // Action & Assert
  //     await expect(pegawaiRepositoryPostgres.verifyAvailableThread('thread-456')).rejects.toThrowError(NotFoundError);
  //   });

  //   it('should return thread correctly', async () => {
  //     const pegawaiRepositoryPostgres = new PegawaiRepositoryPostgres(pool, {});
  //     await UserTableTestHelper.addUser({});
  //     await JasaTableTestHelper.addThread({});
  //     const thread = await pegawaiRepositoryPostgres.verifyAvailableThread('thread-123');

  //     expect(thread).toBe(true);
  //   });
  // });
});
