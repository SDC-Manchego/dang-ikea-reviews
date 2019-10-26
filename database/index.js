var mysql = require('mysql');
var casual = require('casual');
var connection = mysql.createConnection({
  host: 'ec2-3-14-80-255.us-east-2.compute.amazonaws.com',
  user: 'pikearev',
  password: 'parsnip8000',
  database: 'ikea_reviews'
});

connection.connect();

var getProductDataById = function(req, callback) {
  connection.query("SELECT * FROM product_data WHERE id = ?", req.product_id, (error, results, fields) => {
    if (error) {
      return error;
    }
    callback(null, results);
  })
}

var getReviewsByProductId = function(req, callback) {
  connection.query("SELECT * FROM reviews WHERE product_id = ?", req.product_id, (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    callback(null, results);
  })
}

var incrementReviewCounts = function(req, callback) {
  connection.query("UPDATE reviews SET ?? = ?? + 1 WHERE id = ?", [req.column, req.column, req.id], (error, results, fields) => {
    if (error) {
      console.log(error);
    }
    callback(null, results);
  })
}

module.exports.getProductDataById = getProductDataById;
module.exports.getReviewsByProductId = getReviewsByProductId;
module.exports.incrementReviewCounts = incrementReviewCounts;
