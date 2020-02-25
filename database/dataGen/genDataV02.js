const faker = require('faker');

const fs = require('fs');

const generateItemData = () => {
  const wsItem = fs.createWriteStream('./database/csv/items.csv');

  // eslint-disable-next-line quotes
  wsItem.write(`itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerId,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount\n`);


  // 2.5M sellers
  let i = 2500000;

  // item id
  let k = 1;

  // shipping options
  const shipping = ['yes', 'eligible', ''];

  const generateItem = () => {
    let ok = true;

    do {
      const generateSellerInfo = {
        sellerId: i,
        sellerPicture: faker.image.avatar(),
        sellerName: faker.internet.userName(),
        sellerCountry: faker.address.country().replace(/,/g, ''),
        sellerTotalSales: Math.floor(Math.random() * 500),
        sellerJoinDate: Math.floor(Math.random() * (2020 - 2005 + 1)) + 2005,
        sellerStarRating: Math.floor(Math.random() * 5),
        sellerReviewCount: Math.floor(Math.random() * 500),
      };

      // decrement num sellers
      i -= 1;

      let j = 0;

      // there will be a minimum of 10 items
      const numOfItems = Math.floor(Math.random() * 10) + 10;

      // iterate through the number of items
      while (j < numOfItems) {
        const generatedItemInfo = {};

        Object.entries(generateSellerInfo).forEach(([key, value]) => {
          generatedItemInfo[key] = value;
        });

        const randomImgUrl = Math.floor(Math.random() * 50) + 1;

        generatedItemInfo.itemId = k;
        generatedItemInfo.itemName = faker.commerce.productName();
        generatedItemInfo.itemPrice = (Math.random() * 1200).toFixed(2) + 5;
        generatedItemInfo.itemPicture = `https://sdc-additional-items.s3.amazonaws.com/photo${randomImgUrl}.jpg`;
        generatedItemInfo.itemFreeShipping = shipping[Math.floor(shipping.length * Math.random())];

        const itemEntry = `${generatedItemInfo.itemId},${generatedItemInfo.itemName},${generatedItemInfo.itemPrice},${generatedItemInfo.itemPicture},${generatedItemInfo.itemFreeShipping},${generatedItemInfo.sellerId},${generatedItemInfo.sellerPicture},${generatedItemInfo.sellerName},${generatedItemInfo.sellerCountry},${generatedItemInfo.sellerTotalSales},${generatedItemInfo.sellerJoinDate},${generatedItemInfo.sellerStarRating},${generatedItemInfo.sellerReviewCount}\n`;

        if (i === 0) {
          wsItem.write(itemEntry);
        } else {
          ok = wsItem.write(itemEntry);
        }
        // increment the item id
        k += 1;
        // increment the num of items
        j += 1;
      }
    } while (i > 0 && ok);

    if (i > 0) {
      wsItem.once('drain', generateItem);
    }
  };
  generateItem();
};

generateItemData();
