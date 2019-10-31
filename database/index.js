const mysql = require('mysql');
const casual = require('casual');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'JackAndKat',
  database: 'ikea_reviews',
});

connection.connect();

// not touching this
const getProductDataById = function (req, callback) {
  connection.query('SELECT * FROM product_data WHERE id = ?', req.product_id, (error, results, fields) => {
    try {
      callback(null, results);
    } catch (e) {
      console.error(e);
    }
  });
};

// create review for one product
const postReviewsByProductId = function (product, callback) {
  const queryString = 'Insert into reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, helpful_count, not_helpful_count) VALUES(?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?, ?)';

  connection.query(queryString, (Object.values(product)), (error, results) => {
    try {
      callback(null, results);
    } catch (e) {
      console.error(e);
    }
  });
};


// get reviews for one product
const getReviewsByProductId = function (productid, callback) {
  const queryString = `SELECT * FROM reviews WHERE product_id = ${productid}`;
  connection.query(queryString, (error, results) => {
    try {
      callback(null, results);
    } catch (e) {
      console.error(e);
    }
  });
};

// update
const incrementReviewCounts = function (req, callback) {
  connection.query('UPDATE reviews SET ?? = ?? + 1 WHERE id = ?', [req.column, req.column, req.id], (error, results, fields) => {
    try {
      callback(null, results);
    } catch (e) {
      console.error(e);
    }
  });
};


// delete one review instead all review for one product
const deleteReviewsById = function (id, callback) {
  const queryString = `delete from reviews where id =${id}`;
  connection.query(queryString, (error, results) => {
    try {
      callback(null, results[0]);
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports.getProductDataById = getProductDataById;
module.exports.getReviewsByProductId = getReviewsByProductId;
module.exports.postReviewsByProductId = postReviewsByProductId;
module.exports.deleteReviewsById = deleteReviewsById;
module.exports.incrementReviewCounts = incrementReviewCounts;
