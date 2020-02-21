-- CREATE KEYSPACE [IF NOT EXISTS] etsy_v02 WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- USE etsy_v02;

DROP TABLE IF EXISTS additionalItems;

CREATE TABLE additionalItems (
  itemId int PRIMARY KEY,
  sellerId int,
);


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

USE etsy_v02;

COPY sellerItems(sellerId,itemId,itemName,itemPrice,itemPicture,itemFreeShipping,sellerPicture,sellerName,sellerCountry,sellerTotalSales,sellerJoinDate,sellerStarRating,sellerReviewCount) FROM '/Users/yerxiong/code/yer-space/HRR43/team-leia/SDC/sdcData/sellers.csv' WITH DELIMITER=',' AND HEADER=TRUE;

COPY additionalItems(itemId,sellerId) FROM '/Users/yerxiong/code/yer-space/HRR43/team-leia/SDC/sdcData/itemsForCass_edited2.csv' WITH DELIMITER=',' AND HEADER=TRUE;


*/