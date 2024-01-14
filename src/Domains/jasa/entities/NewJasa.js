class NewJasa {
  constructor(payload) {
    this._validate(payload);

    const {
      name, price,
    } = payload;
    this.name = name;

    this.price = price;
  }

  _validate(payload) {
    const {
      name, price,
    } = payload;
    if (!name || !price) {
      throw new Error('NEW_JASA.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string' || typeof price !== 'number') {
      throw new Error('NEW_JASA.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewJasa;
