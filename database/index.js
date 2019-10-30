const mysql = require('mysql');
const casual = require('casual');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'JackAndKat',
  database: 'ikea_reviews',
});

connection.connect();

const getProductDataById = function (req, callback) {
  connection.query('SELECT * FROM product_data WHERE id = ?', req.product_id, (error, results, fields) => {
    if (error) {
      return error;
    }
    callback(null, results);
  });
};

const getReviewsByProductId = function (req, callback) {
  connection.query('SELECT * FROM reviews WHERE product_id = ?', req.product_id, (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    callback(null, results);
  });
};

const postReviewsByProductId = function (product, callback) {
  // const {
  //   product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, helpful_count, not_helpful_count,
  // } = product;
  const queryString = 'Insert into reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, helpful_count, not_helpful_count) VALUES(?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?, ?)';

  connection.query(queryString, (Object.values(product)), (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    callback(null, results);
  });
};

const incrementReviewCounts = function (req, callback) {
  connection.query('UPDATE reviews SET ?? = ?? + 1 WHERE id = ?', [req.column, req.column, req.id], (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    callback(null, results);
  });
};

module.exports.getProductDataById = getProductDataById;
module.exports.getReviewsByProductId = getReviewsByProductId;
module.exports.postReviewsByProductId = postReviewsByProductId;
module.exports.incrementReviewCounts = incrementReviewCounts;
