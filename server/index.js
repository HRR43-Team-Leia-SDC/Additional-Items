const nr = require('newrelic');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const cors = require('cors');

// getSellerItems from postgres
const { getSellerItems } = require('../database/postgres/index.js');

const app = express();
app.use(cors());

app.use('/', expressStaticGzip('./public', {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));

app.use(express.urlencoded({ extended: true }));

app.get('/additional/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  console.log('server1');

  if (isNaN(Number(req.params.id))) {
    res.status(400).json({ error: 'Invalid input type' });
  } else {
    getSellerItems(itemId)
      .then((items) => {
        res.status(200).send(items);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
});

// app.post('/additional/sellerId/:id', (req, res) => {
//   const sellerId = parseInt(req.params.id, 10);

//   const { } = req.body;

//   if (isNaN(Number(req.params.id))) {
//     res.status(400).json({ error: 'Invalid input type' });
//   } else {
//     postSellerItem(sellerId)
//       .then((result) => {
//         res.status(200).send(result);
//       })
//       .catch((err) => {
//         res.status(400).send(err);
//       });
//   }
// });

const port = process.env.ADDITIONAL_ITEMS_PORT || 3004;

module.exports = app.listen(port, console.log(`Listening on port ${port}`));
