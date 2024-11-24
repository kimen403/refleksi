// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class KursUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase

  async execute(useCasePayload) {
    console.log("masuk usecase kurs");
    const kurs = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
    const kursJson = await kurs.json();
    const kursData = kursJson.rates.IDR;
    return kursData;
  }
}

module.exports = KursUseCase;
