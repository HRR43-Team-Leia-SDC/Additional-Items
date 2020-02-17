const faker = require('faker');

const fs = require('fs');

const generateItemData = () => {
  const wsItem = fs.createWriteStream('./database/csv/items.csv');

  wsItem.write('itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerId\n');

  // 50M total items
  let i = 50000000;

  // freeShipping
  const shipping = ['yes', 'eligible', ''];

  const generateItem = () => {
    let ok = true;

    do {
      const itemId = i;
      const itemName = faker.commerce.productName();
      const itemPrice = (Math.random() * 1200).toFixed(2);

      const randomImgUrl = Math.floor(Math.random() * 50) + 1;
      const itemPicture = `https://sdc-additional-items.s3.amazonaws.com/photo${randomImgUrl}.jpg`;

      const itemFreeShipping = shipping[Math.floor(shipping.length * Math.random())];
      const sellerId = Math.floor(Math.random() * 2000000 + 1);

      const itemEntry = `${itemId},${itemName},${itemPrice},${itemPicture},${itemFreeShipping},${sellerId}\n`;

      i--;

      if (i === 0) {
        wsItem.write(itemEntry);
      } else {
        ok = wsItem.write(itemEntry);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      wsItem.once('drain', generateItem);
    }
  };
  generateItem();
};

generateItemData();

const generateSellerData = () => {
  const wsSeller = fs.createWriteStream('./database/csv/seller.csv');

  wsSeller.write('sellerId,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount\n');

  // 2M total sellers
  let i = 2000000;

  const generateSeller = () => {
    let ok = true;

    do {
      const sellerId = i;
      const sellerPicture = faker.image.avatar();
      const sellerName = faker.internet.userName();
      const sellerCountry = faker.address.country();
      const sellerTotalSales = Math.floor(Math.random() * 500);
      const sellerJoinDate = faker.date.past();
      const sellerStarRating = Math.floor(Math.random() * 2 + 3);
      const sellerReviewCount = Math.floor(Math.random() * 800 + 25);

      const sellerEntry = `${sellerId},${sellerPicture},${sellerName},${sellerCountry},${sellerTotalSales},${sellerJoinDate},${sellerStarRating},${sellerReviewCount}\n`;

      i--;

      if (i === 0) {
        wsSeller.write(sellerEntry);
      } else {
        ok = wsSeller.write(sellerEntry);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      wsSeller.once('drain', generateSeller);
    }
  };
  generateSeller();
};

generateSellerData();
