class NewProducts {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      name,
      categoryId,
      price,
      stock,
      weight,
      isDiscount,
      discount,
      description,
      link,
      brand,
    } = payload;
    this.productName = name;
    this.categoryId = categoryId;
    this.price = price;
    this.stock = stock;
    this.weight = weight;
    this.isDiscount = isDiscount;
    this.discount = discount;
    this.description = description;
    this.link = link;
    this.brand = brand;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      name,
      categoryId,
      price,
      stock,
      weight,
      isDiscount,
      discount,
      description,
      link,
      brand,
    } = payload;

    // veryfiy payload required
    console.log(typeof discount);
    if (
      !name ||
      !categoryId ||
      !price ||
      !stock ||
      !weight ||
      !link ||
      !brand
    ) {
      throw new Error("NEW_PRODUCTS.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    // veryfiy payload data type
    if (
      typeof name !== "string" ||
      typeof categoryId !== "number" ||
      typeof price !== "number" ||
      typeof stock !== "number" ||
      typeof weight !== "number" ||
      // typeof isDiscount !== "boolean" ||
      typeof discount !== "number" ||
      typeof description !== "string" ||
      typeof link !== "string" ||
      typeof brand !== "string"
    ) {
      throw new Error("NEW_PRODUCTS.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewProducts;
