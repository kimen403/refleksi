class Product {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      name,
      price,
      image,
      id,
      brand,
      category,
      description,
      discount,
      isDiscount,
      stock,
      weight,
    } = payload;
    this.name = name;
    this.price = price;
    this.image = image;
    this.id = id;
    this.brand = brand;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const { name } = payload;

    // veryfiy payload required
    if (!name) {
      throw new Error("PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    // veryfiy payload data type
    if (typeof name !== "string") {
      throw new Error("PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = Product;
