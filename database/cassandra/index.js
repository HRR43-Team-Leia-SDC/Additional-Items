const cassandra = require('cassandra-driver');

// https://docs.datastax.com/en/developer/nodejs-driver/4.4/features/connection-pooling/

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1', '127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'etsy_v02',
  // pooling: {
  //   maxRequestsPerConnection: 20000,
  // },
});

const t0 = new Date();


client.connect()
  .then(() => {
    console.log('start', new Date() - t0);
    const query = 'SELECT sellerid FROM additionalitems WHERE itemid=28999999';
    return client.execute(query);
  })
  .then((result) => {
    const { sellerid } = result.rows[0];
    const query = `SELECT * FROM selleritems WHERE sellerid=${sellerid}`;
    return client.execute(query);
  })
  .then((allitems) => {
    const items = allitems.rows;
    console.log('timestamp', new Date() - t0);
  })
  .catch((err) => {
    console.error('there was an error', err);
    return client.shutdown().then(() => { throw err; });
  });

module.exports = client;
