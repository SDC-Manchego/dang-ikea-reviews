const casual = require('casual');
// const { Client } = require('pg');

const productCount = 1000000;
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter({
  separator: ';',
  newline: '\n',
  headers: undefined,
  sendHeaders: true,
});

function rando(start, stop) {
  return start + Math.round(Math.random() * (stop - start));
}

function isRecommended() {
  const array = [true, false];
  const test = rando(0, 1);

  return array[test];
}

function ReviewRecordMaker() {
  const obj = {};

  obj.product_id = rando(0, productCount);//
  obj.title = casual.title;
  obj.text = casual.sentences(rando(2, 10));
  obj.date = new Date(new Date() - rando(0, 70000000000)).toISOString().slice(0, 10);
  obj.author = casual.first_name;
  obj.overall_rating = rando(1, 5);
  obj.value_rating = rando(1, 5);
  obj.quality_rating = rando(1, 5);
  obj.appearance_rating = rando(1, 5);
  obj.ease_of_assembly_rating = rando(1, 5);
  obj.works_as_expected_rating = rando(1, 5);
  obj.recommended = isRecommended();
  obj.helpful_count = rando(0, 770);
  obj.not_helpful_count = rando(0, 770);
  return obj;
}

let i = 10000000;
writer.pipe(fs.createWriteStream(`${__dirname}/reviews.csv`));

function writeReviews() {
  let ok = true;
  do {
    i -= 1;
    if (i === 0) {
      writer.write(ReviewRecordMaker());
      console.log('completed seeding reviews');
      writer.end();
    } else {
      ok = writer.write(ReviewRecordMaker());
    }
  } while (i > 0 && ok);
  if (i > 0) {
    writer.once('drain', writeReviews);
  }
}

writeReviews();

// ////////////////////////

// function rando(start, stop) {
//   return start + Math.round(Math.random() * (stop - start));
// }

// function isRecommended() {
//   const array = [true, false];
//   const test = rando(0, 1);

//   return array[test];
// }

// function ReviewRecordMaker() {
//   const obj = {};
//   obj.product_id = rando(0, productCount);//
//   // obj.title = 'womp';
//   obj.title = casual.title;
//   obj.text = casual.sentences(rando(2, 30));
//   // obj.text = 'hello';
//   obj.date = new Date(new Date() - rando(0, 700000000000)).toISOString().slice(0, 10);
//   obj.author = casual.first_name;
//   // obj.author = 'moo';
//   obj.overall_rating = rando(1, 5);
//   obj.value_rating = rando(1, 5);
//   obj.quality_rating = rando(1, 5);
//   obj.appearance_rating = rando(1, 5);
//   obj.ease_of_assembly_rating = rando(1, 5);
//   obj.works_as_expected_rating = rando(1, 5);
//   obj.recommended = isRecommended();
//   obj.helpful_count = rando(0, 770);
//   obj.not_helpful_count = rando(0, 770);
//   return obj;
// }

// const main = function () {
//   const client = new Client();
//   client.connect();

//   for (let i = 0; i < reviewCount/2; i += 1) {
//     const queryString = 'insert into reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, helpful_count, not_helpful_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);';
//     const randomizedRecord = ReviewRecordMaker();// obj
//     client.query(queryString, (Object.values(randomizedRecord))).then().catch((err) => { console.log(err); });
//   }
// };
// main();
// console.log('done');


// const client = new Client();
// client.connect();

// const queryString = "COPY reviews(product_id,title,text,date,author,overall_rating,value_rating,quality_rating,appearance_rating,ease_of_assembly_rating,works_as_expected_rating,recommended,helpful_count,not_helpful_count) FROM '/Users/silkyh13/dang-ikea-reviews/out.csv' DELIMITER ';' CSV HEADER;";
// client.query(queryString, (error, results, fields) => {
//   if (error) {
//     console.error(error);
//   }
//   console.log(results);
// });
