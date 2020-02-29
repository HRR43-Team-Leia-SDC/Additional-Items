require('dotenv').config();
const { Client, Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
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
