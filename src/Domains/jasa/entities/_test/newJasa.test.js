/*! !!! ISI PAYLOAD YANG DI BUTUHKAN DARI CLIENT :::
payload =
 {
    name: 'jasa 1',
    price: 50000
    };
*/

const NewJasa = require('../NewJasa');

describe('a NewJasa entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      name: 'jasa 1',

    };
    expect(() => new NewJasa(payload)).toThrow('NEW_JASA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type spesification', () => {
    const payload = {
      name: 'jasa 1',
      price: '50000',
    };
    expect(() => new NewJasa(payload)).toThrow('NEW_JASA.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should success create NewJasa Object', () => {
    const payload = {
      name: 'jasa 1',
      price: 50000,
    };

    const {
      name, price,
    } = new NewJasa(payload);

    expect(name).toEqual(payload.name);
    expect(price).toEqual(payload.price);
    // expect(id).toEqual(payload.id);
    // expect(content).toEqual(payload.content);
    // expect(owner).toEqual(payload.owner);
    // expect(threadId).toEqual(payload.thread_id);
  });
});
