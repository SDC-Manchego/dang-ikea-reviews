const { Pool, Client } = require('pg');

const connectionString = 'postgres://root:JackAndKat@localhost:5432/ikea';
const pool = new Pool({
  connectionString,
});

const client = new Client({
  connectionString,
});
client.connect();

// not touching this

const getProductDataById = (id, callback) => {
  const ProductDataById = parseInt(id, 10);
  client.query('SELECT * FROM product_data WHERE id = $1;', [ProductDataById], (error, results) => {
    if (error) {
      throw error;
    }

    callback(results.rows);
  });
};

// create review for one product

const postReviewsByProductId = function (product, callback) {
  const queryString = 'INSERT INTO reviews(product_id,title,text,date,author,overall_rating,value_rating,quality_rating,appearance_rating,ease_of_assembly_rating,works_as_expected_rating,recommended,helpful_count,not_helpful_count) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
  client.query(queryString, (Object.values(product)), (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      // console.log(res.rows[0]);
      callback(null, res.rows[0]);
    }
  });
};

// get reviews for one product

const getReviewsByProductId = (productid, callback) => {
  const id = parseInt(productid, 10);
  client.query('select * from reviews where product_id = $1;', [id], (error, results) => {
    if (error) {
      throw error;
    }
    callback(results.rows);
  });
};


// update
const incrementReviewCounts = function (req, callback) {
  client.query('UPDATE reviews SET ?? = ?? + 1 WHERE id = ?', [req.column, req.column, req.id], (error, results, fields) => {
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
  client.query(queryString, (error, results) => {
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
