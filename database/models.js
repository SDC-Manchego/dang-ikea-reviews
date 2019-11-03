
const csvWriter = require('csv-write-stream');
const { Client } = require('pg');

const client = new Client();
client.connect();

const writer = csvWriter({
  separator: ';',
  newline: '\n',
  headers: undefined,
  sendHeaders: true,
});

const copyReviews = (filePath) => {
  client.query(`COPY reviews(product_id,title,text,date,author,overall_rating,value_rating,quality_rating,appearance_rating,ease_of_assembly_rating,works_as_expected_rating,recommended,helpful_count,not_helpful_count) from '${filePath}' DELIMITER ';' CSV HEADER;`, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('success');
    }
  });
};

module.exports = {
  copyReviews,
};


// const queryString = "COPY reviews(product_id,title,text,date,author,overall_rating,value_rating,quality_rating,appearance_rating,ease_of_assembly_rating,works_as_expected_rating,recommended,helpful_count,not_helpful_count) FROM '/Users/silkyh13/dang-ikea-reviews/out.csv' DELIMITER ';' CSV HEADER;";
// client.query(queryString, (error, results, fields) => {
//   if (error) {
//     console.error(error);
//   }
//   console.log(results);
// });
