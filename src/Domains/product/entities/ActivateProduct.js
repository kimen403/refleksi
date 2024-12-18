class ActivateProduct {
  constructor(payload) {
    const { id, name, price, description, brand } = payload;
    this.id = id;
    this.productName = name;
    this.price = parseFloat(price);
    this.description = description || "No Description";
    this.brand = brand;
    this._verifyPayload(payload);
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const { name } = payload;

    if (!name || !this.price || !this.description || !this.brand) {
      throw new Error("NEW_PRODUCTS.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    // veryfiy payload data type
    if (
      typeof this.productName !== "string" ||
      typeof this.price !== "number" ||
      typeof this.description !== "string" ||
      typeof this.brand !== "string"
    ) {
      throw new Error("NEW_PRODUCTS.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = ActivateProduct;
