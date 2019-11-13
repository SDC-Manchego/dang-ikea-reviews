const casual = require('casual');
// const { Client } = require('pg');

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

function ProductRecordMaker(i) {
  // add in productID when iterating thru database insertion
  const obj = {};
  obj.id = i;
  obj.description = casual.sentences(rando(1 - 2));
  obj.product_name = casual.words(3);
  obj.designer = casual.full_name;
  obj.height = rando(25, 42);
  obj.length = rando(60, 92);
  obj.width = rando(25, 42);
  obj.weight = rando(100, 200);
  obj.environment = casual.sentences(rando(4 - 7));
  obj.materials = casual.sentences(rando(4 - 7));
  obj.product_id = ReviewRecordMaker();
  return obj;
}

let i = 1000;
writer.pipe(fs.createWriteStream(`${__dirname}/products.csv`));


function writeProducts() {
  let ok = true;
  do {
    i -= 1;
    if (i === 0) {
      writer.write(ProductRecordMaker(1000 - i));
      console.log('completed seeding reviews');
      writer.end();
    } else {
      ok = writer.write(ProductRecordMaker(1000 - i));
    }
  } while (i > 0 && ok);
  if (i > 0) {
    writer.once('drain', writeProducts);
  }
}

writeProducts();

// Copy product_data (id,description, product_name, designer, height, length, width, weight, environment, materials) FROM '/Users/silkyh13/dang-ikea-reviews/databaseCass/products.csv' WITH HEADER = true AND DELIMITER=';';
