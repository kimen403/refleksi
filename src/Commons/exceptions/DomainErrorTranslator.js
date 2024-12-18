const InvariantError = require("./InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  "PRODUCT_NOT_FOUND: new InvariantError": new InvariantError(
    "product tidak ditemukan"
  ),
  PRODUCT_NOT_CONTAIN_NEEDED_PROPERTY: new InvariantError(
    "tidak dapat membuat product baru karena properti yang dibutuhkan tidak ada"
  ),
  "ACTIVATE_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat product baru karena properti yang dibutuhkan tidak ada"
  ),
  "ACTIVATE_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat product baru karena tipe data tidak sesuai"
  ),
  "NEW_PRODUCTS.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat product baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_PRODUCTS.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat product baru karena tipe data tidak sesuai"
  ),

  "NEW_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat kategori baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat kategori baru karena tipe data tidak sesuai"
  ),
  "KAS_HISTORY_RESPONSE.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat kas baru karena properti yang dibutuhkan tidak ada"
  ),
  "KAS_HISTORY_RESPONSE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat kas baru karena tipe data tidak sesuai"
  ),
  "POST_TRANSAKSI_USE_CASE.NOT_CONTAIN_ANY_KATEGORI": new InvariantError(
    "tidak dapat membuat transaksi baru karena kategori tidak ada"
  ),
  "KAS_DEBITCOH.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat kas baru karena tipe data tidak sesuai"
  ),
  "KAS_DEBITCOH.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat kas baru karena properti yang dibutuhkan tidak ada"
  ),
  "POST_TRANSAKSI_USE_CASE.NOT_CONTAIN_ANY_PAYLOAD": new InvariantError(
    "tidak dapat membuat transaksi baru karena payload tidak ada"
  ),
  "POST_TRANSAKSI_USE_CASE.NOT_CONTAIN_ANY_JENIS": new InvariantError(
    "tidak dapat membuat transaksi baru karena jenis tidak ada"
  ),
  "POST_TRANSAKSI_USE_CASE.NOT_CONTAIN_ANY_TOTAL": new InvariantError(
    "tidak dapat membuat transaksi baru karena total tidak ada"
  ),
  "POST_TRANSAKSI_USE_CASE.NOT_CONTAIN_ANY_KETERANGAN": new InvariantError(
    "tidak dapat membuat transaksi baru karena keterangan tidak ada"
  ),
  "POST_TRANSAKSI_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError(
      "tidak dapat membuat transaksi baru karena tipe data tidak sesuai"
    ),
  "POST_TRANSAKSI_USE_CASE.NOT_CONTAIN_ANY_ID": new InvariantError(
    "tidak dapat membuat transaksi baru karena id tidak ada"
  ),
  "OPEN_KASIR_DATABASE.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat kasir baru kesalahan di server karena properti yang dibutuhkan tidak ada"
  ),
  "OPEN_KASIR_DATABASE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat kasir baru karena kesalahan di server tipe data tidak sesuai"
  ),
  "CLOSE_KASIR.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat kasir baru karena properti yang dibutuhkan tidak ada"
  ),
  "CLOSE_KASIR.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat kasir baru karena tipe data tidak sesuai"
  ),

  "OPEN_KASIR.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat kasir baru karena properti yang dibutuhkan tidak ada"
  ),
  "OPEN_KASIR.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat kasir baru karena tipe data tidak sesuai"
  ),
  "GET_TRANSAKSI_DETAIL_BY_ID.NOT_CONTAIN_ANY_ID": new InvariantError(
    "harus mengirimkan id transaksi"
  ),
  "NEW_TRANSAKSI_PENJUALAN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat transaksi baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_TRANSAKSI_PENJUALAN.NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError(
      "tidak dapat membuat transaksi baru karena tipe data tidak sesuai"
    ),
  "NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat authentication baru karena properti yang dibutuhkan tidak ada"
  ),
  "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
    "tidak dapat membuat user baru karena username mengandung karakter terlarang"
  ),
  "REGISTER_USER.USERNAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
  ),
  "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user baru karena tipe data tidak sesuai"
  ),
  "NEW_JASA.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat jasa baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_JASA.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat jasa baru karena tipe data tidak sesuai"
  ),
  "NEW_TRANSAKSI.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat transaksi baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_TRANSAKSI.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat transaksi baru karena tipe data tidak sesuai"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat product baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat product baru karena tipe data tidak sesuai"
  ),
  "NEW_PEGAWAI.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat pegawai baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_PEGAWAI.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat pegawai baru karena tipe data tidak sesuai"
  ),

  "NEW_COMMENT.NOT_MEET_DATA_SPESIFICATION": new InvariantError(
    "tidak dapat membuat comment baru karena tipe data tidak sesuai"
  ),
  "DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali"
  ),
  "REGISTER_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
  ),
  "REGISTER_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user baru karena tipe data tidak sesuai"
  ),
  "REGISTER_ADMIN.USERNAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "REGISTER_ADMIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
    "tidak dapat membuat user baru karena username mengandung karakter terlarang"
  ),
  "ADMIN_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan username dan password"
  ),
  "ADMIN_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "username dan password harus string"
  ),
  "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),

  "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),

  "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),

  "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),

  "NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali"
  ),
  "NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat thread baru karena property tidak lengkap Silahkan cek kembali"
  ),
};

module.exports = DomainErrorTranslator;
