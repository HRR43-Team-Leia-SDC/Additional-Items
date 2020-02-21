/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { getAllSellerItemsExceptCurrentItem, addManyItems } = require('./index');
const { testData } = require('../dummyData/testData');

describe('Database Methods', () => {
  let insertedItems;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });

    insertedItems = await addManyItems(testData);
  });

  afterAll(() => {
    mongoose.connection.close();
    console.log('connection closed');
  });

  it('save many items at once', async () => {
    expect(insertedItems.length).toBe(testData.length);
  });

  it('should return all items except the one given', async () => {
    const returnedItems = await getAllSellerItemsExceptCurrentItem(1);
    const idArray = returnedItems.map((item) => item.itemId);

    const returnedItems2 = await getAllSellerItemsExceptCurrentItem(4);
    const idArray2 = returnedItems2.map((item) => item.itemId);

    expect(idArray).not.toContain(1);
    expect(idArray2).not.toContain(4);
  });
});
