class AddMinusStock {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      productId, addMinusStock,
    } = payload;
    this.productId = productId;
    this.addMinusStock = addMinusStock;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      productId, addMinusStock,
    } = payload;

    // veryfiy payload required
    if (!productId || !addMinusStock) {
      throw new Error('ADD_STOCK.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // console.log(typeof productId, typeof addMinusStock);
    // veryfiy payload data type

    if (typeof productId !== 'string' || typeof addMinusStock !== 'number') {
      throw new Error('ADD_STOCK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddMinusStock;
