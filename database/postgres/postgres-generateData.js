// ignore for now

// const { Pool } = require('pg');
// const fastcsv = require('fast-csv');
// // import generateData.js

// // @dev use environment variables instead of hardcoding credentials https://node-postgres.com/features/connecting

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
//     if (err) {
//       console.log('client.query()', err.stack);
//     } else {
//       // res will be JSON data that needs to be parsed
//       const data = JSON.parse(JSON.stringify(res.rows));

//       // export to CSV file
//       fastcsv
//       // write JSON data as a csv file
//         .write(data, { headers: true })
//         // log message on finish
//         .on('finish', () => {
//           console.log('success, wrote to csv');
//         })
//         // pipe CSV data
//         .pipe(ws);
//       // callback once finish writing
//       done(console.log('creating CSV from client'));
//     }
//   });
// });
