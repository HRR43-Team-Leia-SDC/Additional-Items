-- CREATE KEYSPACE [IF NOT EXISTS] etsy WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- USE etsy;

DROP TABLE IF EXISTS additionalItems;

CREATE TABLE additionalItems (
  itemId int PRIMARY KEY,
  itemName varchar,
  itemPrice decimal,
  itemPicture varchar,
  itemFreeShipping varchar,
  sellerId int,
  sellerPicture varchar,
  sellerName varchar,
  sellerCountry text,
  sellerTotalSales int,
  sellerJoinDate int,
  sellerStarRating decimal,
  sellerReviewCount int
);

-- query-first approach to find items by seller, sellerId will be partition key and results will be ordered by itemId (clustering key)
-- @dev create a csv file where sellerId is in the first column and itemId is in the second column

DROP TABLE IF EXISTS sellerItems;

CREATE TABLE sellerItems (
  sellerId int,
  itemId int,
  itemName varchar,
  itemPrice decimal,
  itemPicture varchar,
  itemFreeShipping varchar,
  sellerPicture varchar,
  sellerName varchar,
  sellerCountry text,
  sellerTotalSales int,
  sellerJoinDate int,
  sellerStarRating decimal,
  sellerReviewCount int,
  PRIMARY KEY(sellerId, itemId)
);

/*
CREATE KEYSPACE etsy WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE etsy;

COPY additionalItems(itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerId,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount) FROM '/Users/yerxiong/code/yer-space/HRR43/team-leia/SDC/sdcData/items.csv' WITH DELIMITER=',' AND HEADER=TRUE;

COPY additionalItems(itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerId,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount) FROM '/Users/yerxiong/code/yer-space/HRR43/team-leia/SDC/sdcData/sellers.csv' WITH DELIMITER=',' AND HEADER=TRUE;


*/