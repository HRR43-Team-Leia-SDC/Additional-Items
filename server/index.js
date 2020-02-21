const express = require('express');
const expressStaticGzip = require('express-static-gzip');
// const db = require('../database');
// const { Item } = require('../database/schemas.js');

// getSellerItems from postgres
const { getSellerItems } = require('../database/postgres/index.js');

const app = express();

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

// @dev mongoDB CRUD
// app.get('/additional/:id', (req, res) => {
//   console.log(`responding to GET for ${req.params.id}`);

//   // eslint-disable-next-line no-restricted-globals
//   if (isNaN(Number(req.params.id))) {
//     res.status(400).json({ error: 'Invalid input type' });
//   } else {
//     // need to sanitize this at some point
//     db.getAllSellerItemsExceptCurrentItem(req.params.id)
//       .then((allItems) => {
//         res.status(200).json(allItems);
//       })
//       .catch(() => {
//         res.status(404).json({ error: 'That ID does not exist in the database' });
//       });
//   }
// });

// @dev mongoDB CRUD
app.post('/additional', (req, res) => {
  const newItem = new Item({
    sellerName: req.body.sellerName,
    sellerCountry: req.body.sellerCountry,
    sellerTotalSales: req.body.sellerTotalSales,
    sellerJoinDate: req.body.sellerJoinDate,
    sellerPicture: req.body.sellerPicture,
    sellerStarRating: req.body.sellerStarRating,
    sellerReviewCount: req.body.sellerReviewCount,
    itemId: req.body.itemId,
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemPicture: req.body.itemPicture,
    itemFreeShipping: req.body.itemFreeShipping,
  });

  newItem.save()
    .then(() => res.json('Item saved'))
    .catch((err) => res.status(400).json({ Error: err }));
});

// @dev mongoDB CRUD
app.put('/additional/:id', (req, res) => {
  const { id } = req.params;

  const item = {
    sellerName: req.body.sellerName,
    sellerCountry: req.body.sellerCountry,
    sellerTotalSales: req.body.sellerTotalSales,
    sellerJoinDate: req.body.sellerJoinDate,
    sellerPicture: req.body.sellerPicture,
    sellerStarRating: req.body.sellerStarRating,
    sellerReviewCount: req.body.sellerReviewCount,
    itemId: req.body.itemId,
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemPicture: req.body.itemPicture,
    itemFreeShipping: req.body.itemFreeShipping,
  };

  Item.findByIdAndUpdate(id, item)
    .then(() => res.json('Item updated!'))
    .catch((err) => res.status(400).json({ Error: err }));
});

// @dev mongoDB CRUD
app.delete('/additional/:id', (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then(() => res.json('Item deleted'))
    .catch((err) => res.status(400).json({ Error: err }));
});


const port = process.env.ADDITIONAL_ITEMS_PORT || 3004;

module.exports = app.listen(port, console.log(`Listening on port ${port}`));
