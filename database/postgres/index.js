const { Client, Pool } = require('pg');

// use environment variables https://node-postgres.com/features/connecting

// const client = new Client({
//   host: 'localhost',
//   database: 'etsy',
//   port: 5432,
// });

// client
//   .connect()
//   .then(() => console.log('Postgres client connected'))
//   .catch((err) => console.error('connection error', err.stack));

// const getSellerItems = (itemId) => {
//   client.connect();
//   const query = 'SELECT * FROM additionalitems WHERE sellerid IN (SELECT sellerid FROM additionalitems WHERE itemid=$1)';
//   const value = [itemId];
//   // console.log('itemid', value);
//   client
//     .query(query, value)
//     .then((res) => {
//       const filteredSellerItems = res.rows.filter((item) => (
//         item.itemid !== Number(itemId)
//       ));
//       return filteredSellerItems;
//     })
//     .catch((err) => {
//       console.log(err.stack);
//     })
//     .then(() => client.end());
// };

const pool = new Pool({
  // user: 'dbuser',
  host: 'localhost',
  database: 'etsy',
  // password
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


const getSellerItems = (itemId) => pool
  .connect()
  .then((client) => client
    .query('SELECT * FROM additionalitems WHERE sellerid IN (SELECT sellerid FROM additionalitems WHERE itemid=$1)', [itemId])
    .then((res) => {
      client.release();

      const filteredSellerItems = res.rows.filter((item) => (
        item.itemid !== Number(itemId)
      ));
      return filteredSellerItems;
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    }));


module.exports = { getSellerItems };
