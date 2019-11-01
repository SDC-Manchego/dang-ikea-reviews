const casual = require('casual');
const { Client } = require('pg');

const client = new Client();
client.connect();

function rando(start, stop) {
  return start + Math.round(Math.random() * (stop - start));
}

function productIdListMaker(qty) {
  const list = [];
  for (let i = 0; i < qty; i += 1) {
    list.push(i);
  }
  return list;
}

const productIdList = productIdListMaker(100);

function isRecommended() {
  const array = [true, false];
  const test = rando(0, 2);
  if (test === 2) {
    return null;
  }
  return array[test];
}

function ReviewRecordMaker() {
  const obj = {};
  obj.product_id = (productIdList[rando(0, productIdList.length - 1)]);
  obj.title = casual.title;
  obj.text = casual.sentences(rando(2, 5));
  obj.date = new Date(new Date() - rando(0, 70000000000)).toISOString().slice(0, 10);
  obj.author = casual.first_name;
  obj.overall_rating = rando(1, 5);
  obj.value_rating = rando(1, 5);
  obj.quality_rating = rando(1, 5);
  obj.appearance_rating = rando(1, 5);
  obj.ease_of_assembly_rating = rando(1, 5);
  obj.works_as_expected_rating = rando(1, 5);
  obj.recommended = isRecommended();
  obj.helpful_count = rando(0, 77);
  obj.not_helpful_count = rando(0, 77);
  return obj;
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

const insertProductSeeds = function (recordMaker, count) {
  for (let i = 0; i < count; i++) {
    const randomizedRecord = recordMaker();
    const queryString = 'Insert into product_data (description, product_name, designer, height, length, width, weight, environment, materials) values ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
    // randomizedRecord.id = i;
    client.query(queryString, (Object.values(randomizedRecord)), (error, results, fields) => {
      if (error) {
        console.error(error);
      }
      console.log(results);
    });
  }
};

const insertReviewSeeds = function (recordMaker, count) {
  for (let i = 0; i < count; i++) {
    const queryString = 'Insert into reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, helpful_count, not_helpful_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);';
    const randomizedRecord = recordMaker();// obj
    client.query(queryString, (Object.values(randomizedRecord)), (error, results, fields) => {
      if (error) {
        console.error(error);
      }
      console.log(results);
    });
  }
};

function Overseeder() {
  const obj = {};
  obj.product_id = '0';
  obj.title = casual.title;
  obj.text = casual.sentences(rando(2, 5));
  obj.date = new Date(new Date() - rando(0, 70000000000)).toISOString().slice(0, 10);
  obj.author = casual.first_name;
  obj.overall_rating = rando(1, 5);
  obj.value_rating = rando(1, 5);
  obj.quality_rating = rando(1, 5);
  obj.appearance_rating = rando(1, 5);
  obj.ease_of_assembly_rating = rando(1, 5);
  obj.works_as_expected_rating = rando(1, 5);
  obj.recommended = isRecommended();
  obj.helpful_count = rando(0, 77);
  obj.not_helpful_count = rando(0, 77);
  return obj;
}

const overSeedReviews = function (recordMaker, count) {
  for (let i = 0; i < count; i++) {
    const queryString = 'Insert into reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, helpful_count, not_helpful_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);';
    const randomizedRecord = recordMaker();
    client.query(queryString, (Object.values(randomizedRecord)), (error, results, fields) => {
      if (error) {
        console.error(error);
      }
      console.log(results);
    });
  }
};

const seedReviews = () => { insertReviewSeeds(ReviewRecordMaker, 944); };
const seedProducts = () => { insertProductSeeds(ProductRecordMaker, 100); };
const overSeed = () => { overSeedReviews(Overseeder, 66); };
const seedAccordion = () => {
  seedReviews();
  seedProducts();
  overSeed();
};
module.exports.seedReviews = seedReviews;
module.exports.seedProducts = seedProducts;
module.exports.overSeed = overSeed;
module.exports.seedAccordion = seedAccordion();
