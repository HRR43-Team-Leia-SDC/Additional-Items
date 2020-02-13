const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const db = require('../database');
const Item = require('../database/schemas.js');

const app = express();

app.use('/', expressStaticGzip('./public', {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));

app.use(express.urlencoded({ extended: true }));

// the req.params.id refers to the itemId, a get request will return all items for the same sellerName except the current item
app.get('/additional/:id', (req, res) => {
  console.log(`responding to GET for ${req.params.id}`);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(Number(req.params.id))) {
    res.status(400).json({ error: 'Invalid input type' });
  } else {
    // need to sanitize this at some point
    db.getAllSellerItemsExceptCurrentItem(req.params.id)
      .then((allItems) => {
        res.status(200).json(allItems);
      })
      .catch((err) => {
        res.status(404).json({ error: err });
      });
  }
});

// get seller items
// app.get('/additional/:sellerName', (req, res) => {


// });

// post will post item to the database
app.post('/additional', (req, res) => {
  console.log('req.body', req.body);
  const newItem = new Item({
    sellerName: req.body.sellerName,
    sellerCountry: req.body.sellerCountry,
    sellerTotalSales: Number(req.body.sellerTotalSales),
    // Date.parse(req.body.sellerJoinDate)
    sellerJoinDate: req.body.sellerJoinDate,
    sellerPicture: req.body.sellerPicture,
    sellerStarRating: Number(req.body.sellerStarRating),
    sellerReviewCount: Number(req.body.sellerReviewCount),
    itemId: Number(req.body.itemId),
    itemName: req.body.itemName,
    itemPrice: Number(req.body.itemPrice),
    itemPicture: req.body.itemPicture,
    itemFreeShipping: req.body.itemFreeShipping,
  });

  console.log('newItem, newItem');

  newItem.save()
    .then(() => res.json('Item added'))
    .catch((err) => {
      res.status(404).json({ error: err });
    });
});

// put - has id
app.put('/additional/:id', (req, res) => {
  const id = req.params;
  // eslint-disable-next-line object-shorthand
  Item.findOne({ _id: id })
    .then((item) => {
      console.log('findONe', item);

      item.sellerName = req.body.sellerName;
      item.sellerCountry = req.body.sellerCountry;
      item.sellerTotalSales = Number(req.body.sellerTotalSales);
      // Date.parse(req.body.sellerJoinDate)
      item.sellerJoinDate = req.body.sellerJoinDate;
      item.sellerPicture = req.body.sellerPicture;
      item.sellerStarRating = Number(req.body.sellerStarRating);
      item.sellerReviewCount = Number(req.body.sellerReviewCount);
      item.itemId = Number(req.body.itemId);
      item.itemName = req.body.itemName;
      item.itemPrice = Number(req.body.itemPrice);
      item.itemPicture = req.body.itemPicture;
      item.itemFreeShipping = req.body.itemFreeShipping;


      item.save()
        .then(() => res.json('Item updated'))
        .catch((err) => {
          res.status(404).json({ error: err });
        });

});


// delete - has id
app.delete('/additional/:id', (req, res) => {
  const id = req.params;
  // eslint-disable-next-line object-shorthand
  Item.deleteOne({ _id: id })
    .then(() => res.json('Item deleted'))
    .catch((err) => {
      res.status(404).json({ error: err });
    });
});

const port = process.env.ADDITIONAL_ITEMS_PORT || 3004;

module.exports = app.listen(port, console.log(`Listening on port ${port}`));
