/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// tests that the schema is working properly
const mongoose = require('mongoose');
const { Item } = require('../database/schemas');

const itemData = {
  itemId: 1,
  itemName: 'Kylo Lightsaber',
  itemPrice: 999.00,
  itemPicture: 'urlToItemPicture',
  itemFreeShipping: 'yes',
  sellerPicture: 'urlToSellerPicture',
  sellerName: 'Kylo-ren',
  sellerCountry: 'United States',
  sellerTotalSales: 400,
  sellerJoinDate: new Date(),
};
let validItem;

describe('Item Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
    validItem = new Item(itemData);
  });

  afterAll(() => {
    mongoose.connection.close();
    console.log('connection closed');
  });

  it('should create & save an item successfully', async () => {
    const savedItem = await validItem.save();
    expect(savedItem._id).toBeDefined();
    expect(savedItem.itemId).toBe(itemData.itemId);
    expect(savedItem.itemName).toBe(itemData.itemName);
    expect(savedItem.itemPrice).toBe(itemData.itemPrice);
    expect(savedItem.itemPicture).toBe(itemData.itemPicture);
    expect(savedItem.itemFreeShipping).toBe(itemData.itemFreeShipping);
    expect(savedItem.sellerPicture).toBe(itemData.sellerPicture);
    expect(savedItem.sellerName).toBe(itemData.sellerName);
    expect(savedItem.sellerCountry).toBe(itemData.sellerCountry);
    expect(savedItem.sellerTotalSales).toBe(itemData.sellerTotalSales);
    expect(savedItem.sellerJoinDate).toBe(itemData.sellerJoinDate);
  });

  it('should not insert an invalid field', async () => {
    const invalidItem = new Item({ itemId: 2, itemLocation: 'UnitedStates' });
    const savedInvalidItem = await invalidItem.save();
    expect(savedInvalidItem.itemId).toBe(invalidItem.itemId);
    expect(savedInvalidItem.itemLocation).toBeUndefined();
  });

  // additional tests could include:
  // making all fields required
  // value types are matching, String = a string
});
