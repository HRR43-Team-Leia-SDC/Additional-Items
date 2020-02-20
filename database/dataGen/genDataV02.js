const faker = require('faker');

const fs = require('fs');

const generateItemData = () => {
  const wsItem = fs.createWriteStream('/Users/yerxiong/code/yer-space/HRR43/team-leia/SDC/sdcData/items_v02.csv');

  // eslint-disable-next-line quotes
  wsItem.write(`itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerId,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount\n`);

  // 30M total items
  // let i = 30000000;
  // 2.5M sellers
  let i = 2500000;

  // k is the number of sellers
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


      // k will be the number of sellers
      // while (k > 0) {
      //   const generateSellerInfo = {
      //     sellerId: k,
      //     sellerPicture: faker.image.avatar(),
      //     sellerName: faker.internet.userName(),
      //     sellerCountry: faker.address.country().replace(/,/g, ''),
      //     sellerTotalSales: Math.floor(Math.random() * 500),
      //     sellerJoinDate: Math.floor(Math.random() * (2020 - 2005 + 1)) + 2005,
      //     sellerStarRating: Math.floor(Math.random() * 5),
      //     sellerReviewCount: Math.floor(Math.random() * 500),
      //   };

      //   let j = 0;

      //   // there will be a minimum of 10 items
      //   const numOfItems = Math.floor(Math.random() * 10) + 10;

      //   // iterate through the number of items
      //   while (j < numOfItems) {
      //     const generatedItemInfo = {};

      //     Object.entries(generateSellerInfo).forEach(([key, value]) => {
      //       generatedItemInfo[key] = value;
      //     });

      //     const randomImgUrl = Math.floor(Math.random() * 50) + 1;

      //     generatedItemInfo.itemId = i;
      //     generatedItemInfo.itemName = faker.commerce.productName();
      //     generatedItemInfo.itemPrice = (Math.random() * 1200).toFixed(2) + 5;
      //     generatedItemInfo.itemPicture = `https://sdc-additional-items.s3.amazonaws.com/photo${randomImgUrl}.jpg`;
      //     generatedItemInfo.itemFreeShipping = shipping[Math.floor(shipping.length * Math.random())];

      //     const itemEntry = `${generatedItemInfo.itemId},${generatedItemInfo.itemName},${generatedItemInfo.itemPrice},${generatedItemInfo.itemPicture},${generatedItemInfo.itemFreeShipping},${generatedItemInfo.sellerId},${generatedItemInfo.sellerPicture},${generatedItemInfo.sellerName},${generatedItemInfo.sellerCountry},${generatedItemInfo.sellerTotalSales},${generatedItemInfo.sellerJoinDate},${generatedItemInfo.sellerStarRating},${generatedItemInfo.sellerReviewCount}\n`;

      //     // increment the item id
      //     i += 1;
      //     // increment the num of items
      //     j += 1;

      //     if (k === 0) {
      //       wsItem.write(itemEntry);
      //     } else {
      //       ok = wsItem.write(itemEntry);
      //     }
      //   }

      //   // decrement the number of sellers
      //   k -= 1;
      // }

      // once I have an item, I want to write it to the csv file

      // const itemId = i;
      // const itemName = faker.commerce.productName();
      // const itemPrice = (Math.random() * 1200).toFixed(2) + 5;

      // const randomImgUrl = Math.floor(Math.random() * 50) + 1;

      // const itemPicture = `https://sdc-additional-items.s3.amazonaws.com/photo${randomImgUrl}.jpg`;

      // const itemFreeShipping = shipping[Math.floor(shipping.length * Math.random())];
      // const sellerId = Math.floor(Math.random() * 1000000) + 1;
      // const sellerPicture = faker.image.avatar();
      // const sellerName = faker.internet.userName();
      // const sellerCountry = faker.address.country().replace(/,/g, '');
      // const sellerTotalSales = Math.floor(Math.random() * 500);
      // const sellerJoinDate = Math.floor(Math.random() * (2020 - 2005 + 1)) + 2005;
      // const sellerStarRating = Math.floor(Math.random() * 5);
      // const sellerReviewCount = Math.floor(Math.random() * 500);


      // const itemEntry = `${itemId},${itemName},${itemPrice},${itemPicture},${itemFreeShipping},${sellerId},${sellerPicture},${sellerName},${sellerCountry},${sellerTotalSales},${sellerJoinDate},${sellerStarRating},${sellerReviewCount}\n`;

      // i -= 1;

      // if (i === 0) {
      //   wsItem.write(itemEntry);
      // } else {
      //   ok = wsItem.write(itemEntry);
      // }
    } while (i > 0 && ok);

    if (i > 0) {
      wsItem.once('drain', generateItem);
    }
  };
  generateItem();
};

generateItemData();
