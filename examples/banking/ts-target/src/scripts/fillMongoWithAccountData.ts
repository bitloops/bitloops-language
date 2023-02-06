import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27021';
const client = new Mongo.Client(url);

// Database Name
const dbName = 'banking';

const customersInputData: any[] = [
  {
    _id: '2d1df7b7-e923-4b25-bfba-c87202d1d21e',
    email: 'test@email.com',
    pin: '0000',
    accountId: '85c5d65a-2c7e-4a9c-ad31-e367bb3c4f95',
  },
];

const accountsInputData: any[] = [
  {
    _id: '85c5d65a-2c7e-4a9c-ad31-e367bb3c4f95',
    balance: {
      currency: 'EUR',
      amount: 2345,
    },
  },
];

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const customersCollection = db.collection('customers');
  const accountsCollection = db.collection('accounts');

  const insertResult = await customersCollection.insertMany(customersInputData);
  console.log('Inserted documents =>', insertResult);

  const accountInsertResult = await accountsCollection.insertMany(accountsInputData);
  console.log('Inserted documents =>', accountInsertResult);

  const customersFindResult = await customersCollection.find({}).toArray();
  console.log('Found documents =>', customersFindResult);
  // the following code examples can be pasted here...
  const accountsFindResult = await accountsCollection.find({}).toArray();
  console.log('Found documents =>', accountsFindResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
