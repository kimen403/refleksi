/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ProductTableTestHelper = {
  async addProduct({
    productId = 'Product001',
    barcode = 'P-001',
    productName = 'Product 1',
    unitId = 1,
    categoryId = 1,
    stockNow = 10,
    stockMin = 5,
    unitPrice = 100000,
    purchasePrice = 50000,
    image = 'image.jpg',

  }) {
    const query = {
      text: 'INSERT INTO tblproduct VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      values: [productId, barcode, productName, unitId, categoryId, stockNow, stockMin, unitPrice, purchasePrice, image],
    };

    await pool.query(query);
  },

  async findProductById(id) {
    const query = {
      text: 'SELECT * FROM tblproduct WHERE product_id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM tblproduct WHERE 1=1');
  },
};

module.exports = ProductTableTestHelper;
