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


function ProductRecordMaker() {
  // add in productID when iterating thru database insertion
  const obj = {};
  obj.description = casual.sentences(rando(1 - 2));
  obj.product_name = casual.words(3);
  obj.designer = casual.full_name;
  obj.height = rando(25, 42);
  obj.length = rando(60, 92);
  obj.width = rando(25, 42);
  obj.weight = rando(100, 200);
  obj.environment = casual.sentences(rando(4 - 7));
  obj.materials = casual.sentences(rando(4 - 7));
  return obj;
}

let i = 1000;
writer.pipe(fs.createWriteStream(`${__dirname}/products.csv`));


function writeProducts() {
  let ok = true;
  do {
    i -= 1;
    if (i === 0) {
      writer.write(ProductRecordMaker());
      console.log('completed seeding reviews');
      writer.end();
    } else {
      ok = writer.write(ProductRecordMaker());
    }
  } while (i > 0 && ok);
  if (i > 0) {
    writer.once('drain', writeProducts);
  }
}

writeProducts();
