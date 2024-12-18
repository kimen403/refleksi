class NewProducts {
  constructor(payload) {
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
      srcPic,
    } = payload;
    this.productName = name;
    this.categoryId = categoryId || 1;
    this.price = price;
    this.stock = stock || 100;
    this.weight = weight || 1;
    this.isDiscount = isDiscount || false;
    this.discount = discount || 0;
    this.description = description || "No Description";
    this.link = link;
    this.brand = brand;
    this.image = srcPic;
    this._verifyPayload(payload);
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
      srcPic,
    } = payload;

    // veryfiy payload required

    if (!name || !price || !link || !brand) {
      throw new Error("NEW_PRODUCTS.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    console.log(typeof price);
    // veryfiy payload data type
    if (
      typeof name !== "string" ||
      typeof this.categoryId !== "number" ||
      typeof this.price !== "number" ||
      typeof this.stock !== "number" ||
      typeof this.weight !== "number" ||
      // typeof isDiscount !== "boolean" ||
      typeof this.discount !== "number" ||
      typeof this.description !== "string" ||
      typeof link !== "string" ||
      typeof brand !== "string"
    ) {
      throw new Error("NEW_PRODUCTS.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewProducts;
