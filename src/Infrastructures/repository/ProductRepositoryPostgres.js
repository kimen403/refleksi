const InvariantError = require("../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const ProductRepository = require("../../Domains/product/ProductRepository");

// status 0 = inactive
// status 1 = active
// status 2 = draft
class ProductRepositoryPostgres extends ProductRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addProduct(newProduct) {
    console.log("masuk Repository addProduct");
    console.log("newProduct", newProduct);
    // status set ke 2 karena produk yang diinputkan adalah draft

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
      image,
    } = newProduct;
    const CheckCategory = await this.checkCategory(newProduct.categoryId);
    console.log("check category oke");

    if (!CheckCategory) {
      await this.addCategory({ categoryName: "uncategory" });
    }
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const productId = `P-${this._idGenerator(2)}-${date}`;
    productId.toUpperCase();
    isDiscount = isDiscount ? 1 : 0;
    const status = 2;

    const query = {
      text: 'INSERT INTO products VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING product_id AS "productId", name AS "productName", category_id AS "categoryId", sell_price AS "price", stock, weight, is_discount AS "isDiscount", discount, description',
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
        image,
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

  async activateProduct(activateProduct) {
    const query = {
      text: "UPDATE products SET status = 1 , sell_price = $2 ,brand = $3,description =$4  WHERE product_id = $1 RETURNING product_id AS id, name AS name, category_id AS categoryId, sell_price AS price, stock, weight, is_discount AS isDiscount, discount, description",
      values: [
        activateProduct.id,
        activateProduct.price,
        activateProduct.brand,
        activateProduct.description,
      ],
    };
    try {
      const { rows } = await this._pool.query(query);
      console.log(rows[0]);
      return rows[0];
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async getAllProduct() {
    const query = {
      text: "SELECT p.product_id AS id, p.name, p.sell_price as price,image, c.name  as category FROM products p JOIN categories c ON p.category_id = c.category_id where p.status = 1",
    };

    const result = await this._pool.query(query);
    console.log(result.rows);
    return result.rows;
  }

  async addCategory(newCategory) {
    const { categoryName } = newCategory;

    const query = {
      text: "INSERT INTO categories (name) VALUES($1) RETURNING category_id AS categoryId, name AS title",
      values: [categoryName],
    };
    try {
      const { rows } = await this._pool.query(query);
      return rows[0];
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  // FIXME - add unit test
  async getProductById(productId) {
    const query = {
      text: 'SELECT product_id AS id, name,buy_price, sell_price as price, stock, weight, is_discount as "isDiscount", discount, description, brand, image ,size FROM products WHERE product_id = $1',
      values: [productId],
    };
    try {
      const result = await this._pool.query(query);
      return result.rows[0];
    } catch (e) {
      console.log(e);
    }
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
    console.log("verify product");
    // console.log(productId);
    const query = {
      text: "SELECT product_id FROM products WHERE product_id = $1",
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

  async checkCategory(categoryId) {
    const query = {
      text: "SELECT category_id FROM categories WHERE category_id = $1",
      values: [categoryId],
    };
    const { rows } = await this._pool.query(query);
    console.log("check category", rows);
    try {
      if (rows[0]) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async getDraftProduct() {
    const query = {
      text: "SELECT product_id AS id,name,buy_price,sell_price,brand,image FROM products AS p WHERE status = 2",
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = ProductRepositoryPostgres;
