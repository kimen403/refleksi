/*! !!! ISI PAYLOAD YANG DI BUTUHKAN DARI CLIENT :::
payload = {
    productId: 'product-123',
    addMinusStock: 1,
    };
*/

const AddStock = require('../AddMinusStock');

describe('a AddStock entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      productId: 'product-123',
    };
    expect(() => new AddStock(payload)).toThrow('ADD_STOCK.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type spesification', () => {
    const payload = {
      productId: 'product-123',
      addMinusStock: '1',

    };
    expect(() => new AddStock(payload)).toThrow('ADD_STOCK.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should success create AddStock Object', () => {
    const payload = {
      productId: 'product-123',
      addMinusStock: 10.0,
    };

    const {
      productId, addMinusStock,
    } = new AddStock(payload);

    expect(productId).toEqual(payload.productId);
    expect(addMinusStock).toEqual(payload.addMinusStock);
  });
});
