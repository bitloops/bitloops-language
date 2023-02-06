import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

const url = 'mongodb://localhost:27021';
const client = new Mongo.Client(url);

// Database Name
const dbName = 'test_banking';

const id = '85c5d65a-2c7e-4a9c-ad31-e367bb3c4f95';
const account: any = {
  _id: id,
  balance: {
    currency: 'EUR',
    amount: 20,
  },
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

  // Increases by 10
  const sessionOne = client.startSession();
  // Decreases by 10
  const sessionTwo = client.startSession();

  const transactionOptions: Mongo.TransactionOptions = {
    // readConcern: { level: 'snapshot' },
    // writeConcern: { w: 'majority' },
    // readPreference: 'primary',
  };
  try {
    sessionOne.startTransaction(transactionOptions);

    sessionTwo.startTransaction(transactionOptions);

    const accountOne = await collection.findOne(
      {
        _id: id,
      },
      {
        session: sessionOne,
      },
    );
    console.log('accountOne =>', accountOne);

    const accountTwo = await collection.findOne(
      {
        _id: id,
      },
      {
        session: sessionTwo,
      },
    );
    console.log('accountTwo =>', accountTwo);

    await collection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          balance: {
            currency: 'EUR',
            amount: accountOne!.balance.amount + 10,
          },
        },
      },
      {
        session: sessionOne,
      },
    );
    console.log('Added 10 to accountOne =>');

    await sessionOne.commitTransaction();

    await collection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          balance: {
            currency: 'EUR',
            amount: accountTwo!.balance.amount - 10,
          },
        },
      },
      {
        session: sessionTwo,
      },
    );
    console.log('Subtracted 10 from accountTwo =>');

    await sessionTwo.commitTransaction();
  } catch (e) {
    console.log('Error =>', e);
    await sessionOne.abortTransaction();
    await sessionTwo.abortTransaction();
  } finally {
    await sessionOne.endSession();
    await sessionTwo.endSession();
  }

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

    const amount = op(account!.balance.amount);
    await collection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          balance: {
            currency: 'EUR',
            amount,
          },
        },
      },
      {
        session,
      },
    );
    console.log('Added 10 to accountOne =>');

    await session.commitTransaction();

    console.log('Subtracted 10 from accountTwo =>');
    await session.commitTransaction();
  } catch (e) {
    console.log('Error =>', e);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}
