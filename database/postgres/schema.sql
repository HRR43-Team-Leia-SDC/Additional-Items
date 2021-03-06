DROP DATABASE IF EXISTS etsy;

CREATE DATABASE etsy;

\c etsy;

DROP TABLE IF EXISTS additionalItems;

CREATE TABLE additionalItems (
  itemId SERIAL NOT NULL PRIMARY KEY,
  itemName varchar(100),
  itemPrice numeric,
  itemPicture varchar(250),
  itemFreeShipping varchar(250),
  sellerId int,
  sellerPicture varchar(250),
  sellerName varchar(50),
  sellerCountry text,
  sellerTotalSales int,
  sellerJoinDate int,
  sellerStarRating real,
  sellerReviewCount int
);

CREATE INDEX sellerId_index ON additionalItems(sellerId);


/*

COPY additionalItems(itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerId,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount) FROM './database/csv/items.csv' WITH DELIMITER ',' CSV HEADER;

*/