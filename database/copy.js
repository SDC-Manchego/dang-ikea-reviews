const models = require('./models.js');

models.copyReviews(`${__dirname}/reviews.csv`);
models.copyProducts(`${__dirname}/products.csv`);
