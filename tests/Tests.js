const useCasePayload = [
  {
    pegawai: {
      id: 'pegawai-mRsiSMr6mE2Yxil',
      email: 'ssssadas@gmailsdss.sss',
      nama: 'sri kunciatiningsih',
      foto: null,
      status: true,
    },
    jasa: [
      {
        id: 'jasa-ifi', title: 'jasa kaki', price: 15000, total: 1,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
    ],
  },
  {
    pegawai: {
      id: 'pegawai-eVvdDxUMUfbQ5sq',
      email: 'rizkyfirmaan17@gmail.com',
      nama: 'ssss',
      foto: null,
      status: true,
    },
    jasa: [
      {
        id: 'jasa-ifi', title: 'jasa kaki', price: 15000, total: 1,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
    ],
  },
  {
    pegawai: {
      id: 'pegawai-pAIQ82Ikwiru2r7',
      email: 'ssssadas@gmailsdss.sss',
      nama: 'Sri kunciatiningsihss',
      foto: null,
      status: true,
    },
    jasa: [
      {
        id: 'jasa-ifi', title: 'jasa kaki', price: 15000, total: 1,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
    ],
  },
  {
    pegawai: {
      id: 'pegawai-p-ZbwGvjY7Z4tRx',
      email: 'rizkyfirmaan17@gmail.com',
      nama: 'Rizky Firman Aprianto',
      foto: null,
      status: true,
    },
    jasa: [
      {
        id: 'jasa-ifi', title: 'jasa kaki', price: 15000, total: 1,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
    ],
  },
  {
    pegawai: {
      id: 'pegawai-9VmBjeVpItfxYkl',
      email: 'ssssadas@gmailsdss.sss',
      nama: 'rizky firman Apriantossss',
      foto: null,
      status: true,
    },
    jasa: [
      {
        id: 'jasa-ifi', title: 'jasa kaki', price: 15000, total: 1,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
      {
        id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
      },
    ],
  },
];

const payload = {
  pegawai: {
    id: 'pegawai-p-ZbwGvjY7Z4tRx',
    email: 'rizkyfirmaan17@gmail.com',
    nama: 'Rizky Firman Aprianto',
    foto: null,
    status: true,
  },
  jasa: [
    {
      id: 'jasa-ifi', title: 'jasa kaki', price: 15000, total: 1,
    },
    {
      id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
    },
    {
      id: 'jasa-Bvf', title: 'kiki', price: 303, total: 3,
    },
  ],
};
// const jmlTransaksi = useCasePayload.reduce((acc, cur) => acc.jasa.price + cur.jasa.price, 0);
// const jumlah = jmlTransaksi;

// console.log(jumlah);

// let totalPrice = 0;

// useCasePayload.forEach((data) => {
//   data.jasa.forEach((jasa) => {
//     totalPrice += jasa.price * jasa.total;
//   });
// });

// console.log('Total Price:', totalPrice);

const dateMonth = new Date().toISOString().slice(0, 10).replace(/-/g, '');
// console.log(dateMonth);
