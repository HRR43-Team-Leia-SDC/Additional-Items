// ignore for now

// const { Pool } = require('pg');

// // use environment variables https://node-postgres.com/features/connecting

// const pool = new Pool({
//   user: 'dbuser',
//   host: 'localhost',
//   database: 'additionalItems',
//   password: '123',
//   port: 5000,
// });

// // open Postgres connection
// pool.connect((err, client, done) => {
//   if (err) throw err;
//   client.query('SELECT * FROM additionalItems', (err, res) => {
//     done();

//     if (err) {
//       console.log(err.stack);
//     } else {
//       // res will be JSON data that needs to be parsed
//       const data = JSON.parse(JSON.stringify(res.rows));

//       // export to CSV file
//     }
//   });
// });

// // async/await checkout client https://node-postgres.com/features/pooling

// // (async () => {
// //   const client = await pool.connect();
// //   console.log('Postgres connected');

// // })().catch(err => console.error(err));


// module.exports = pool;
