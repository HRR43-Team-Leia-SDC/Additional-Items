const { Pool } = require('pg');

// use environment variables https://node-postgres.com/features/connecting

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
      // console.log(filteredSellerItems);
      return filteredSellerItems;
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    }));

// getSellerItems(16);


module.exports = { getSellerItems };
