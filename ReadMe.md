This will be the component that renders the additional items for sale from the seller.

Port:  Set up to use process.env.ADDITIONAL_ITEMS_PORT variable.  Defaults to 3004 if the .env is not set up.

Server start script: npm start

Build script: npm run build

Database seeding script: npm run seed

CRUD API routes

GET items for a seller '/additional'

DELETE an item '/additional/:id'

PUT update an item '/additional/:id'

POST a new item '/additional'
