-- DROP DATABASE IF EXISTS SDCadditionalItems;

-- CREATE DATABASE SDCadditionalItems;

-- \connect SDCadditionalItems;

DROP TABLE IF EXISTS additionalItems;

CREATE TABLE additionalItems (
  itemId int NOT NULL PRIMARY KEY,
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



/*

DROP DATABASE IF EXISTS SDCadditionalItems;

CREATE DATABASE SDCadditionalItems;

\connect SDCadditionalItems;

// @dev relocated CSV file outside of project
COPY additionalItems(itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerId,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount) FROM '/Users/yerxiong/code/yer-space/HRR43/team-leia/SDC/Additional-Items/database/csv/items.csv' WITH DELIMITER ',' CSV HEADER;

COPY additionalItems(itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerId,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount) FROM '/Users/yerxiong/code/yer-space/HRR43/team-leia/SDC/Additional-Items/database/csv/test.csv' WITH DELIMITER ',' CSV HEADER;

*/