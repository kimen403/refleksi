/*! !!! ISI PAYLOAD YANG DI BUTUHKAN DARI CLIENT :::
payload = {
    productName: 'productName',
    unitId: 1,
    categoryId: 1,
    stockNow: 1,
    stockMin: 1,
    unitPrice: 15000,
    image: 'image',
    };
*/

const NewProduct = require('../NewProduct');

describe('a NewProduct entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      productName: 'productName',
      unitId: 1,
      categoryId: 1,
      stockNow: 1,
      image: 'image',
    };
    expect(() => new NewProduct(payload)).toThrow('NEW_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type spesification', () => {
    const payload = {
      productName: 'productName',
      unitId: '1',
      categoryId: '1',
      stockNow: '1',
      stockMin: '1',
      unitPrice: '15000',
      hargaBeli: '15000',
      image: 'image',
    };
    expect(() => new NewProduct(payload)).toThrow('NEW_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should success create NewProduct Object', () => {
    const payload = {
      productName: 'productName',
      unitId: 1,
      categoryId: 1,
      stockNow: 1,
      stockMin: 1,
      unitPrice: 15000,
      hargaBeli: 15000,
      image: 'image',
    };

    const {
      productName, unitId, categoryId, stockNow, stockMin, unitPrice, image, hargaBeli,
    } = new NewProduct(payload);

    expect(hargaBeli).toEqual(payload.hargaBeli);
    expect(productName).toEqual(payload.productName);
    expect(unitId).toEqual(payload.unitId);
    expect(categoryId).toEqual(payload.categoryId);
    expect(stockNow).toEqual(payload.stockNow);
    expect(stockMin).toEqual(payload.stockMin);
    expect(unitPrice).toEqual(payload.unitPrice);
    expect(image).toEqual(payload.image);
  });
});
