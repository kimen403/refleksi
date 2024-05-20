class NewCategory {
  constructor(payload) {
    this._verifyPayload(payload);
    const { title } = payload;
    this.title = title;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const { title } = payload;

    // veryfiy payload required
    if (!title) {
      throw new Error("NEW_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    // veryfiy payload data type
    if (typeof title !== "string") {
      throw new Error("NEW_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewCategory;
