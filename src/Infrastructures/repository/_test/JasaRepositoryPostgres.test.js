// //import TEST HELPER
// const JasaTableTestHelper = require('../../../../tests/UsersTableTestHelper');
// const JasaTableTestHelper = require('../../../../tests/JasaTableTestHelper');
// // Import Unit Test Library
// const JasaRepositoryPostgres = require('../ThreadRespositoryPostgres');
// Import Domain Model
// const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
// const NewThread = require('../../../Domains/jasa/entities/NewThread');
// const AddedThread = require('../../../Domains/jasa/entities/AddedThread');
// Import Connection Pool Library
const JasaTableTestHelper = require('../../../../tests/JasaTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const NewJasa = require('../../../Domains/jasa/entities/NewJasa');
const pool = require('../../database/postgres/pool');
const JasaRepositoryPostgres = require('../JasaRepositoryPostgres');

describe('JasaRepositoryPostgres', () => {
  afterEach(async () => {
    // await JasaTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await JasaTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addJasa function', () => {
    it('should persist new jasa and return added jasa correctly', async () => {
      // Arrange
    //   await UsersTableTestHelper.addAdmin({});
      const newJasa = new NewJasa({
        nama: 'Jasa 1',
        price: 100000,
      });

      const fakeIdGenerator = () => '321';
      const jasaRepositoryPostgres = new JasaRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await jasaRepositoryPostgres.addJasa(newJasa);

      // Assert
      const jasa = await JasaTableTestHelper.findJasaByName('Jasa 1');

      expect(jasa).toHaveLength(1);
    });

    describe('getJasaById function', () => {
      // arrange
      it('should throw NotFoundError when thread not found', async () => {
        // Arrange
        const jasaRepositoryPostgres = new JasaRepositoryPostgres(pool, {});

        // Action & Assert
        await expect(jasaRepositoryPostgres.getJasaById(1)).rejects.toThrowError(NotFoundError);
      });

      it('should return Jasa  correctly', async () => {
        const jasaRepositoryPostgres = new JasaRepositoryPostgres(pool, {});
        await JasaTableTestHelper.addJasa({});

        const thread = await jasaRepositoryPostgres.getJasaById(1);

        expect(thread).toStrictEqual({
          jasaId: '1',
          nama: 'Jasa 1',
          price: 100000,
          status: true,
        });
      });
    });

    describe('getJasa function', () => {
      it('should return thread correctly', async () => {
        const jasaRepositoryPostgres = new JasaRepositoryPostgres(pool, {});
        await JasaTableTestHelper.addJasa({});
        const jasa = await jasaRepositoryPostgres.getJasa();

        expect(jasa).toStrictEqual([{
          jasaId: '1',
          nama: 'Jasa 1',
          price: 100000,
        }]);
      });
    });

    describe('deleteJasa function', () => {
      it('should return delete correctly', async () => {
        const jasaRepositoryPostgres = new JasaRepositoryPostgres(pool, {});
        await JasaTableTestHelper.addJasa({});
        const jasa = await jasaRepositoryPostgres.deleteJasa(1);

        expect(jasa.status).toStrictEqual(false);
      });
    });

    // describe('verifyAvailableThread function', () => {

    //   it('should throw NotFoundError when thread not found', async () => {
    //     // Arrange
    //     const jasaRepositoryPostgres = new JasaRepositoryPostgres(pool, {});

    //     // Action & Assert
    //     await expect(jasaRepositoryPostgres.verifyAvailableThread('thread-456')).rejects.toThrowError(NotFoundError);
    //   });

    //   it('should return thread correctly', async () => {
    //     const jasaRepositoryPostgres = new JasaRepositoryPostgres(pool, {});
    //     await JasaTableTestHelper.addUser({});
    //     await JasaTableTestHelper.addJasa({});
    //     const thread = await jasaRepositoryPostgres.verifyAvailableThread('thread-123');

  //     expect(thread).toBe(true);
  //   });
  });
});
