import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';

// Connection URL
const url = 'mongodb://127.0.0.1:30001/?directConnection=true&replicaSet=my-replica-set';
const client = new Mongo.Client(url);

// Database Name
const dbName = 'marketing';

const notificationTemplatesInputData: any[] = [
  {
    _id: '15c5d72a-1d7e-4a9c-ad31-e367bb3c4f95',
    type: 'firstDeposit',
    template: 'Congrats, you have made your first deposit!',
  },
  {
    _id: '3dc5d72a-1d7e-4a9c-ad31-e367bb3c4f95',
    type: 'milestoneDeposit',
    template: 'Congrats, you are one of our most loyal customers!',
  },
];

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const notificationTemplatesCollection = db.collection('notificationTemplates');

  const insertResult = await notificationTemplatesCollection.insertMany(
    notificationTemplatesInputData,
  );
  console.log('Inserted documents =>', insertResult);

  const customersFindResult = await notificationTemplatesCollection.find({}).toArray();
  console.log('Found documents =>', customersFindResult);
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
