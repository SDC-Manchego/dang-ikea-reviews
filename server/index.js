const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');

const port = 3003;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'), {});
});

app.get('/api-reviews', (req, res) => {
  // console.log("received request: ", req.query);
  db.getReviewsByProductId(req.query, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});
// to-do

app.post('/api-reviews', (req, res) => {
  const obj = {};
  obj.product_id = '0';
  obj.title = 'title';
  obj.text = 'sentences(rando(2, 5))';
  obj.date = new Date(new Date() - 0).toISOString().slice(0, 10);
  obj.author = 'first_name';
  obj.overall_rating =	1;
  obj.value_rating =	1;
  obj.quality_rating =	1;
  obj.appearance_rating =	1;
  obj.ease_of_assembly_rating = 	1;
  obj.works_as_expected_rating =	1;
  obj.recommended = false;
  obj.helpful_count = 2;
  obj.not_helpful_count = 2;

  db.postReviewsByProductId(obj, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/api-product-data', (req, res) => {
  db.getProductDataById(req.query, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});

app.post('/api-increment', (req, res) => {
  // console.log(req.body);
  db.incrementReviewCounts(req.body, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
      res.end(JSON.stringify(results));
    }
  });
});


app.listen(port, () => {
  console.log(`Review server listening on port ${port}, ${new Date()}`);
});

module.exports.app = app;
