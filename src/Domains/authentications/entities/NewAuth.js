class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload);

    this.token = payload.token;
    this.refreshToken = payload.refreshToken;
    this.id = payload.id;
    this.role = payload.role;

    this.username = payload.username;
    this.fullname = payload.fullname;
  }

  _verifyPayload(payload) {
    const { token, refreshToken } = payload;
    // console.log(payload);
    if (!token || !refreshToken) {
      throw new Error("NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof token !== "string" || typeof refreshToken !== "string") {
      throw new Error("NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewAuth;
