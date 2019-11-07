const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'ikea' });
client.connect()
  .then(() => console.log('Connected!'));

const getReviewsByProductId = (product_id, callback) => {
  const query = 'SELECT * from reviews where product_id = ? Allow Filtering;';
  client.execute(query, [product_id], { prepare: true })
    .then((result) => callback(result.rows[0]))
    .catch((err) => {
      console.error(err);
    });
};


module.exports.getReviewsByProductId = getReviewsByProductId;
