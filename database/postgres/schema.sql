CREATE DATABASE additionalItems;

USE additionalItems;

CREATE TABLE additionalItems (
  itemId serial NOT NULL PRIMARY KEY,
  itemName varchar(100),
  itemPrice int,
  itemPicture varchar(250),
  itemFreeShipping varchar(250),
  sellerId int REFERENCES sellers(sellerId),
);

CREATE TABLE sellers (
  sellerId serial NOT NULL PRIMARY KEY,
  sellerPicture varchar(250),
  sellerName varchar(50),
  sellerCountry text,
  sellerTotalSales int,
  sellerJoinDate Date,
  sellerStarRating real,
  sellerReviewCount int,
);

