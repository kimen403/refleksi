/* istanbul ignore file */

const { createContainer } = require("instances-container");

// external agency
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const Jwt = require("@hapi/jwt");
const pool = require("./database/postgres/pool");

// service (repository, helper, manager, etc)
const PasswordHash = require("../Applications/security/PasswordHash");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");
// authenticationRepository
const AuthenticationRepository = require("../Domains/authentications/AuthenticationRepository");
const AuthenticationRepositoryPostgres = require("./repository/AuthenticationRepositoryPostgres");
// adminRepository
const AdminRepository = require("../Domains/admin/AdminRepository");
const AdminRepositoryPostgres = require("./repository/AdminRepositoryPostgres");

// PegawaiRepository
const PegawaiRepository = require("../Domains/pegawai/PegawaiRepository");
const PegawaiRepositoryPostgres = require("./repository/PegawaiRepositoryPostgres");
// jasaRepository
const JasaRepository = require("../Domains/jasa/JasaRepository");
const JasaRepositoryPostgres = require("./repository/JasaRepositoryPostgres");
// transaksiRepository
const TransaksiRepository = require("../Domains/transaksi/TransaksiRepository");
const TransaksiRepositoryPostgres = require("./repository/TransaksiRepositoryPostgres");
// productRepository
const ProductRepository = require("../Domains/product/ProductRepository");
const ProductRepositoryPostgres = require("./repository/ProductRepositoryPostgres");
// detailTransaksiRepository
const TransaksiDetailRepositoryPostgres = require("./repository/TransaksiDetailRepositoryPostgres");
const TransaksiDetailRepository = require("../Domains/transaksi/TransaksiDetailRepository");
// kasirRepository
const KasirRepository = require("../Domains/transaksi/KasirRepository");
const KasirRepositoryPostgres = require("./repository/KasirRepositoryPostgres");

// ------------------ useCase ------------------
const AuthenticationTokenManager = require("../Applications/security/AuthenticationTokenManager");
const JwtTokenManager = require("./security/JwtTokenManager");
const RefreshAuthenticationUseCase = require("../Applications/use_case/Auth_UseCase/RefreshAuthenticationUseCase");
// userUseCase
const AddAdminUseCase = require("../Applications/use_case/AdminUseCase/AddAdminUseCase");
const LoginAdminUseCase = require("../Applications/use_case/AdminUseCase/LoginAdminUseCase");
const LogoutUserUseCase = require("../Applications/use_case/AdminUseCase/LogoutUserUseCase");

// jasaUseCase
const AddJasaUseCase = require("../Applications/use_case/Jasa_UseCase/addJasaUseCase");
const GetJasaUseCase = require("../Applications/use_case/Jasa_UseCase/getJasaUseCase");
const DeleteJasaUseCase = require("../Applications/use_case/Jasa_UseCase/deleteJasaUseCase");

// pegawaiUseCase
const AddPegawaiUseCase = require("../Applications/use_case/Pegawai_UseCase/AddPegawaiUseCase");
const GetAllPegawaiUseCase = require("../Applications/use_case/Pegawai_UseCase/GetAllPegawaiUseCase");
const DeletePegawaiByIdUseCase = require("../Applications/use_case/Pegawai_UseCase/DeletePegawaiByIdUseCase");
const GetPegawaiByIdUseCase = require("../Applications/use_case/Pegawai_UseCase/GetPegawaiByIdUseCase");

// transaksiUseCase
const AddTransaksiUseCase = require("../Applications/use_case/Transaksi_UseCase/AddTransaksiPenjualanUseCase");
const GetAllTransaksiUseCase = require("../Applications/use_case/Transaksi_UseCase/GetAllTransaksiUseCase");
const PostTransaksiPenjualanUseCase = require("../Applications/use_case/Transaksi_UseCase/PostTransaksiPenjualanUseCase");

// kasirUseCase
const OpenKasirUseCase = require("../Applications/use_case/Kasir_UseCase/OpenKasir");
const CloseKasirUseCase = require("../Applications/use_case/Kasir_UseCase/CloseKasir");

// productUseCase
const AddProductUseCase = require("../Applications/use_case/Product_UseCase/AddProduct");
const AddStockUseCase = require("../Applications/use_case/Product_UseCase/AddStock");
const GetAllProductUseCase = require("../Applications/use_case/Product_UseCase/GetAllProduct");
const GetMinStockProductUseCase = require("../Applications/use_case/Product_UseCase/GetMinStock");
const GetProductByIdUseCase = require("../Applications/use_case/Product_UseCase/GetProductById");
const addCategoryUseCase = require("../Applications/use_case/Product_UseCase/AddCategory");

// transaksiPenjualanUseCase
const AddTransaksiPenjualanUseCase = require("../Applications/use_case/Transaksi_UseCase/AddTransaksiPenjualanUseCase");
const GetTransaksiDetailByIdUseCase = require("../Applications/use_case/Transaksi_UseCase/GetTransaksiDetailByIdUseCase");
const GetKasirByIdAdminUseCase = require("../Applications/use_case/Kasir_UseCase/GetKasirByIdAdmin");
const GetAllHistoryKasirUseCase = require("../Applications/use_case/Kasir_UseCase/GetAllHistoryKasir");
const CheckKasirUseCase = require("../Applications/use_case/Kasir_UseCase/CheckKasirStatus");
const PostTransaksiKasDebit = require("../Applications/use_case/Kas_UseCase/PostTransaksiKasDebit");
const PostTransaksiKasKreditUseCase = require("../Applications/use_case/Kas_UseCase/PostTransaksiKasKredit");
const GetHistoryTransaksiPegawaiUseCase = require("../Applications/use_case/Pegawai_UseCase/GetHistoryPegawaiUseCase");
const PostCancelTransaksiUseCase = require("../Applications/use_case/Transaksi_UseCase/PostCancelTransaksiUseCase");
const DeleteAuthenticationUseCase = require("../Applications/use_case/Auth_UseCase/DeleteAuthenticationUseCase");
const PostDebitKasUseCase = require("../Applications/use_case/Kasir_UseCase/PostDebitKas");
const PostCreditKasUseCase = require("../Applications/use_case/Kasir_UseCase/PostCreditKas");
const GetHistoryPenjualanUseCase = require("../Applications/use_case/Transaksi_UseCase/GetHistoryPenjualanUseCase");

// creating container
const container = createContainer();

// registering services and repository
container.register([
  // kasirRepository
  {
    key: KasirRepository.name,
    Class: KasirRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },

  // transaksiDetailRepository
  {
    key: TransaksiDetailRepository.name,
    Class: TransaksiDetailRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },

  // adminRepository
  {
    key: AdminRepository.name,
    Class: AdminRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  // authenticationRepository
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  // passwordHash
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  // authenticationTokenManager
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
  // PegawaiRepository
  {
    key: PegawaiRepository.name,
    Class: PegawaiRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  // jasaRepository
  {
    key: JasaRepository.name,
    Class: JasaRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  // transaksiRepository
  {
    key: TransaksiRepository.name,
    Class: TransaksiRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  // productRepository
  {
    key: ProductRepository.name,
    Class: ProductRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: DeleteAuthenticationUseCase.name,
    Class: DeleteAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  // openKasirUseCase
  {
    key: OpenKasirUseCase.name,
    Class: OpenKasirUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
      ],
    },
  },
  // closeKasirUseCase
  {
    key: CloseKasirUseCase.name,
    Class: CloseKasirUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
      ],
    },
  },
  // addADMINUseCase
  {
    key: AddAdminUseCase.name,
    Class: AddAdminUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "adminRepository",
          internal: AdminRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  // loginAdminUseCase
  {
    key: LoginAdminUseCase.name,
    Class: LoginAdminUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "adminRepository",
          internal: AdminRepository.name,
        },
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  // logoutUserUseCase
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  // refreshAuthenticationUseCase
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
        {
          name: "adminRepository",
          internal: AdminRepository.name,
        },
      ],
    },
  },
  // addJasaUseCase
  {
    key: AddJasaUseCase.name,
    Class: AddJasaUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "jasaRepository",
          internal: JasaRepository.name,
        },
      ],
    },
  },
  // getJasaUseCase
  {
    key: GetJasaUseCase.name,
    Class: GetJasaUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "jasaRepository",
          internal: JasaRepository.name,
        },
      ],
    },
  },
  // deleteJasaUseCase
  {
    key: DeleteJasaUseCase.name,
    Class: DeleteJasaUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "jasaRepository",
          internal: JasaRepository.name,
        },
      ],
    },
  },
  // addPegawaiUseCase
  {
    key: AddPegawaiUseCase.name,
    Class: AddPegawaiUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
      ],
    },
  },

  // getPegawaiUseCase
  {
    key: GetAllPegawaiUseCase.name,
    Class: GetAllPegawaiUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
      ],
    },
  },

  // deletePegawaiUseCase
  {
    key: DeletePegawaiByIdUseCase.name,
    Class: DeletePegawaiByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
      ],
    },
  },

  // GET PEGAWAI BY ID
  {
    key: GetPegawaiByIdUseCase.name,
    Class: GetPegawaiByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
      ],
    },
  },

  // addTransaksiUseCase
  {
    key: AddTransaksiUseCase.name,
    Class: AddTransaksiUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
      ],
    },
  },
  // getTransaksiUseCase
  {
    key: GetAllTransaksiUseCase.name,
    Class: GetAllTransaksiUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
      ],
    },
  },
  // postTransaksiPenjualanUseCase
  {
    key: PostTransaksiPenjualanUseCase.name,
    Class: PostTransaksiPenjualanUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
      ],
    },
  },
  // addProductUseCase
  {
    key: AddProductUseCase.name,
    Class: AddProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  // addCategoryUseCase
  {
    key: addCategoryUseCase.name,
    Class: addCategoryUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  // getProductUseCase
  {
    key: GetAllProductUseCase.name,
    Class: GetAllProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  // getProductByIdUseCase
  {
    key: GetProductByIdUseCase.name,
    Class: GetProductByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  // getMinStockProductUseCase
  {
    key: GetMinStockProductUseCase.name,
    Class: GetMinStockProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  // transaksiPenjualanUseCase
  {
    key: AddTransaksiPenjualanUseCase.name,
    Class: AddTransaksiPenjualanUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
        {
          name: "transaksiDetailRepository",
          internal: TransaksiDetailRepository.name,
        },
        {
          name: "idGenerator",
          concrete: nanoid,
        },
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
        {
          name: "jasaRepository",
          internal: JasaRepository.name,
        },
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
      ],
    },
  },

  // getTransaksiDetailByIdUseCase
  {
    key: GetTransaksiDetailByIdUseCase.name,
    Class: GetTransaksiDetailByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiDetailRepository",
          internal: TransaksiDetailRepository.name,
        },
      ],
    },
  },

  // NOTE - Get Kasir By Id
  {
    key: GetKasirByIdAdminUseCase.name,
    Class: GetKasirByIdAdminUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
      ],
    },
  },

  // GET HISTORY KASIR
  {
    key: GetAllHistoryKasirUseCase.name,
    Class: GetAllHistoryKasirUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
      ],
    },
  },

  {
    key: CheckKasirUseCase.name,
    Class: CheckKasirUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
      ],
    },
  },

  {
    key: PostTransaksiKasDebit.name,
    Class: PostTransaksiKasDebit,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
      ],
    },
  },

  {
    key: PostTransaksiKasKreditUseCase.name,
    Class: PostTransaksiKasKreditUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
      ],
    },
  },

  {
    key: GetHistoryTransaksiPegawaiUseCase.name,
    Class: GetHistoryTransaksiPegawaiUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
      ],
    },
  },

  {
    key: PostCancelTransaksiUseCase.name,
    Class: PostCancelTransaksiUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
        {
          name: "transaksiDetailRepository",
          internal: TransaksiDetailRepository.name,
        },
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
      ],
    },
  },

  {
    key: PostDebitKasUseCase.name,
    Class: PostDebitKasUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
        {
          name: "idGenerator",
          concrete: nanoid,
        },
      ],
    },
  },

  {
    key: PostCreditKasUseCase.name,
    Class: PostCreditKasUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "kasirRepository",
          internal: KasirRepository.name,
        },
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
        {
          name: "idGenerator",
          concrete: nanoid,
        },
      ],
    },
  },
  // GET HISTORY TRANSAKSI PEGAWAI
  {
    key: GetHistoryTransaksiPegawaiUseCase.name,
    Class: GetHistoryTransaksiPegawaiUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "pegawaiRepository",
          internal: PegawaiRepository.name,
        },
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
      ],
    },
  },

  // GET HISTORY PENJUALAN
  {
    key: GetHistoryPenjualanUseCase.name,
    Class: GetHistoryPenjualanUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "transaksiRepository",
          internal: TransaksiRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
