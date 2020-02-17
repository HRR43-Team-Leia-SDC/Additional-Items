const cassandra = require('cassandra-driver');

// https://docs.datastax.com/en/developer/nodejs-driver/4.4/features/connection-pooling/

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1', '127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'etsy',
  pooling: {
    maxRequestsPerConnection: 20000,
  },
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Cassandra connected');
  }
});

module.exports = client;
