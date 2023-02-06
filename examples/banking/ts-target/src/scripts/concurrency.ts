import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

// const url = 'mongodb://localhost:27021';
const url = 'mongodb://localhost:30002/?directConnection=true&replicaSet=my-replica-set';
const client = new Mongo.Client(url);

// Database Name
const dbName = 'test_banking';

const id = '85c5d65a-2c7e-4a9c-ad31-e367bb3c4f95';
const account: any = {
  _id: id,
  amount: 20,
};

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('accounts');

  await collection.deleteMany({});

  const insertResult = await collection.insertOne(account);
  console.log('Inserted documents =>', insertResult);

  const promises = [];
  promises.push(concurrencyClient((n) => n + 10));
  promises.push(concurrencyClient((n) => n - 10));
  promises.push(concurrencyClient((n) => n + 10));
  promises.push(concurrencyClient((n) => n - 10));

  await Promise.all(promises);

  const accountFindResult = await collection.find({}).toArray();
  console.log('Found documents =>', accountFindResult);
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

async function concurrencyClient(op: (n: number) => number) {
  const db = client.db(dbName);

  const collection = db.collection('accounts');

  const session = client.startSession();

  const transactionOptions: Mongo.TransactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    // readPreference: 'primary',
  };
  try {
    session.startTransaction(transactionOptions);

    const account = await collection.findOne(
      {
        _id: id,
      },
      {
        session,
      },
    );
    console.log('account after read =>', account);

    const amount = op(account!.amount);
    await collection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          amount,
        },
      },
      {
        session,
      },
    );
    console.log('amount after update =>', amount);

    await session.commitTransaction();

    await session.commitTransaction();
  } catch (e) {
    console.log('Error =>', e);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}
