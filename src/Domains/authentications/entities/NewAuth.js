class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload);
    this.role = payload.role;
    this.token = payload.token;
    this.refreshToken = payload.refreshToken;
    this.id = payload.id;
    this.isKasirOpen = payload.isKasirOpen;
    this.idKasir = payload.idKasir;
    this.username = payload.username;
    this.fullname = payload.fullname;
  }

  _verifyPayload(payload) {
    const { token, refreshToken, role } = payload;
    // console.log(payload);
    if (!token || !refreshToken || !role) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof token !== 'string' || typeof refreshToken !== 'string' || typeof role !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewAuth;
