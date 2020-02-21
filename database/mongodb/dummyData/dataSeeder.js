/*
Generates fake data for 10 sellers with 10 items each.  Can be modified on line 41 to adjust.
*/
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const generateData = (numOfSellers, numOfItemsPerSeller) => {
  const arrayOfFakeData = [];
  let k = 1;
  // needs to start at 10 for the url for the pictures to take up 2 slots
  let i = 0;

  // create a while loop for the seller
  while (i < numOfSellers) {
    // get fake data for seller
    const generatedSellerInfo = {
      sellerName: faker.internet.userName(),
      sellerCountry: faker.address.country(),
      sellerTotalSales: Math.floor(Math.random() * 500),
      sellerJoinDate: faker.date.past(),
      sellerPicture: `https://www.placecage.com/300/${300 + i}`,
      sellerStarRating: Math.floor(Math.random() * 2 + 3),
      sellerReviewCount: Math.floor(Math.random() * 800 + 25),
    };

    // needs to start at 10 for the url for the pictures to take up 2 slots
    let j = 0;

    const numOfItems = numOfItemsPerSeller || Math.floor(Math.random() * 50);

    // while loop for the items
    while (j < numOfItems) {
      const generatedItemInfo = {};

      // makes a copy of the seller as to not reference the same obj in memory
      Object.entries(generatedSellerInfo).forEach(([key, value]) => {
        generatedItemInfo[key] = value;
      });

      const randomImgUrl = Math.floor(Math.random() * 1000);

      // data for individual items
      generatedItemInfo.itemId = k;
      generatedItemInfo.itemName = faker.commerce.productName();
      generatedItemInfo.itemPrice = (Math.random() * 1200).toFixed(2);
      generatedItemInfo.itemPicture = `https://i.picsum.photos/id/${randomImgUrl}/300/300.jpg`;

      // decide if it is free shipping or elgible
      const freeShippingGenerator = Math.floor(Math.random() * 15);
      if (freeShippingGenerator <= 5) {
        generatedItemInfo.itemFreeShipping = 'yes';
      } else if (freeShippingGenerator > 5 && freeShippingGenerator <= 10) {
        generatedItemInfo.itemFreeShipping = 'elgible';
      } else {
        generatedItemInfo.itemFreeShipping = '';
      }

      arrayOfFakeData.push(generatedItemInfo);

      j += 1;
      k += 1;
    }

    i += 1;
  }

  return arrayOfFakeData;
};


module.exports = {
  generateData,
};
