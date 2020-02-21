const { generateData } = require('./dataSeeder');
const db = require('../database');

const populateDatabase = () => {
  const fakeData = generateData(100);

  db.addManyItems(fakeData)
    .then(() => {
      console.log('Seeding was successful to the Kylo Database with Items Documents!');
      // exits the node process
      process.exit();
    })
    .catch((error) => {
      // console logs the error then excess the node process
      console.error('Seeding the data had the following error:', error);
      process.exit();
    });
};

populateDatabase();
