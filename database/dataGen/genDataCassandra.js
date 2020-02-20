const faker = require('faker');

const fs = require('fs');

const generateItemData = () => {
  const wsItem = fs.createWriteStream('/Users/yerxiong/code/yer-space/HRR43/team-leia/SDC/sdcData/sellers.csv');

  // eslint-disable-next-line quotes
  wsItem.write(`sellerId,itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount\n`);

  // 30M total items
  let i = 30000000;

  // shipping options
  const shipping = ['yes', 'eligible', ''];

  const generateItem = () => {
    let ok = true;

    do {
      const sellerId = Math.floor(Math.random() * 1000000) + 1;
      const itemId = i;
      const itemName = faker.commerce.productName();
      const itemPrice = (Math.random() * 1200).toFixed(2) + 5;

      const randomImgUrl = Math.floor(Math.random() * 50) + 1;

      const itemPicture = `https://sdc-additional-items.s3.amazonaws.com/photo${randomImgUrl}.jpg`;

      const itemFreeShipping = shipping[Math.floor(shipping.length * Math.random())];
      const sellerPicture = faker.image.avatar();
      const sellerName = faker.internet.userName();
      const sellerCountry = faker.address.country().replace(/,/g, '');
      const sellerTotalSales = Math.floor(Math.random() * 500);
      const sellerJoinDate = Math.floor(Math.random() * (2020 - 2005 + 1)) + 2005;
      const sellerStarRating = Math.floor(Math.random() * 5);
      const sellerReviewCount = Math.floor(Math.random() * 500);


      const itemEntry = `${sellerId},${itemId},${itemName},${itemPrice},${itemPicture},${itemFreeShipping},${sellerPicture},${sellerName},${sellerCountry},${sellerTotalSales},${sellerJoinDate},${sellerStarRating},${sellerReviewCount}\n`;

      i -= 1;

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
