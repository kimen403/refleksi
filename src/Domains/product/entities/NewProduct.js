class NewProduct {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      productName, unitId, categoryId, stockNow, stockMin, unitPrice, image, hargaBeli,
    } = payload;
    this.productName = productName;
    this.unitId = unitId;
    this.categoryId = categoryId;
    this.stockNow = stockNow;
    this.stockMin = stockMin;
    this.unitPrice = unitPrice;
    this.hargaBeli = hargaBeli;
    this.image = image;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      productName, unitId, categoryId, stockNow, stockMin, unitPrice, image, hargaBeli,
    } = payload;

    // veryfiy payload required
    if (!productName || !unitId || !categoryId || !stockNow || !stockMin || !unitPrice || !hargaBeli) {
      throw new Error('NEW_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof productName !== 'string' || typeof unitId !== 'number' || typeof categoryId !== 'number' || typeof stockNow !== 'number' || typeof stockMin !== 'number' || typeof unitPrice !== 'number' || typeof hargaBeli !== 'number' || typeof image !== 'string') {
      throw new Error('NEW_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewProduct;
