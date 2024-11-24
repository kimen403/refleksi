const InvariantError = require("../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const ProductRepository = require("../../Domains/product/ProductRepository");

class ProductRepositoryPostgres extends ProductRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addProduct(newProduct) {
    console.log("masuk Repository addProduct");
    // eslint-disable-next-line vars-on-top
    var {
      productName,
      categoryId,
      price,
      sellprice,
      stock,
      weight,
      isDiscount,
      discount,
      link,
      description,
      brand,
    } = newProduct;
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const productId = `P-${this._idGenerator(2)}-${date}`;
    productId.toUpperCase();
    isDiscount = isDiscount ? 1 : 0;
    const status = 1;

    const query = {
      text: 'INSERT INTO products VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING product_id AS "productId", name AS "productName", category_id AS "categoryId", sell_price AS "price", stock, weight, is_discount AS "isDiscount", discount, description',
      values: [
        productId,
        productName,
        categoryId,
        sellprice,
        price,
        stock,
        weight,
        isDiscount,
        discount,
        status,
        description,
        link,
        brand,
      ],
    };
    try {
      const { rows } = await this._pool.query(query);
      return rows[0];
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async getAllProduct() {
    // const query = {
    //   text: 'SELECT product_id AS "productId",  barcode , product_name AS name, stock_now AS stock,  unit_price AS price, image,tblproductunit.unit_name AS "satuan" , tblproductcategory.category_name AS "category" FROM tblproduct INNER JOIN tblproductunit ON tblproduct.unit_id = tblproductunit.unit_id INNER JOIN tblproductcategory ON tblproduct.category_id = tblproductcategory.category_id',
    // };

    const query = {
      text: "SELECT p.product_id, p.name, p.sell_price as price, c.name as category FROM products p JOIN categories c ON p.category_id = c.category_id where p.status = 1",
    };

    const result = await this._pool.query(query);
    console.log(result.rows);
    return result.rows;
  }

  async addCategory(newCategory) {
    const { categoryName } = newCategory;
    const categoryId = `C-${this._idGenerator(2)}`;
    const query = {
      text: 'INSERT INTO tblproductcategory VALUES($1,$2) RETURNING category_id AS "categoryId", category_name AS "title"',
      values: [categoryId, categoryName],
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  // FIXME - add unit test
  async getProductById(productId) {
    const query = {
      text: 'SELECT product_id AS "productId", barcode, product_name AS "name", unit_id AS "unitId", category_id AS category, stock_now AS stock , stock_min AS "stockMin", unit_price AS "unitPrice", image FROM tblproduct WHERE product_id = $1',
      values: [productId],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new NotFoundError("Product tidak ditemukan");
    }
    return result.rows[0];
  }

  async getProductByCode(productCode) {
    const query = {
      text: 'SELECT "product_id", barcode, product_name AS "product_name", "unit_id", "category_id", "stock_now",  "stock_min", "unitPrice", image FROM tblproduct WHERE barcode = $1',
      values: [productCode],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getMinStock() {
    const query = {
      text: 'SELECT "product_id", "product_code", product_name AS "product_name", "unit_id", "category_id", stock_now AS "stock_now", "stock_min", "unitPrice", image FROM tblproduct WHERE stock_now <= stock_min',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async addStock(productId, stock) {
    const query = {
      text: "UPDATE tblproduct SET stock_now = stock_now + $1 WHERE product_id = $2 RETURNING product_id",
      values: [stock, productId],
    };
    try {
      await this._pool.query(query);
      return "Stock Berhasil Ditambahkan";
    } catch (error) {
      throw new InvariantError("Gagal menambahkan stock");
    }
  }

  async minusStock(productId, stock) {
    console.log("masuk minus stock");
    console.log(productId, stock);
    const query = {
      text: 'UPDATE tblproduct SET stock_now = stock_now - $1 WHERE product_id = $2 RETURNING "product_id" ',
      values: [stock, productId],
    };
    try {
      await this._pool.query(query);
    } catch (error) {
      console.log(error);
      throw new InvariantError("Gagal mengurangi stock");
    }
  }

  async verifyAvailableProduct(productId) {
    // console.log(productId);
    const query = {
      text: "SELECT product_id FROM tblproduct WHERE product_id = $1",
      values: [productId],
    };

    const { rows } = await this._pool.query(query);
    // console.log(rows);
    if (!rows[0]) {
      throw new InvariantError("Product tidak tersedia");
    }
  }

  async verifyAvailableStock(productId, stock) {
    // console.log('verify stock');
    const query = {
      text: 'SELECT 1 FROM tblproduct WHERE "product_id" = $1 AND "stock_now" >= $2',
      values: [productId, stock],
    };

    const { rows } = await this._pool.query(query);

    if (!rows[0]) {
      throw new InvariantError("Stock tidak mencukupi");
    }
  }

  async getCategory() {
    const query = {
      text: 'SELECT category_id AS "categoryId", category_name AS "title" FROM tblproductcategory',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = ProductRepositoryPostgres;
