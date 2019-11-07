const casual = require('casual');
// const { Client } = require('pg');

const productCount = 1000;
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

function ReviewRecordMaker(i) {
  const obj = {};
  obj.id = i;
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
      writer.write(ReviewRecordMaker(10000000 - i));
      console.log('completed seeding reviews');
      writer.end();
    } else {
      ok = writer.write(ReviewRecordMaker(10000000 - i));
    }
  } while (i > 0 && ok);
  if (i > 0) {
    writer.once('drain', writeReviews);
  }
}

writeReviews();
