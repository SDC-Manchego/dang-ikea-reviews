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

// create
const postReviewsByProductId = function (product, callback) {
  const queryString = 'Insert into reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, helpful_count, not_helpful_count) VALUES(?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?, ?)';

  connection.query(queryString, (Object.values(product)), (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    callback(null, results);
  });
};
// delete-  'DELETE FROM tutorials_tbl WHERE tutorial_id = 3';
const deleteReviewsByProductId = function (id, callback) {
  const queryString = `delete from reviews where id =${connection.escape(id)}`;
  connection.query(queryString, (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log(`deleted ${results.affectedRows} rows`);
    callback(null, results[0]);
  });
};
// update
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
module.exports.deleteReviewsByProductId = deleteReviewsByProductId;
module.exports.incrementReviewCounts = incrementReviewCounts;
