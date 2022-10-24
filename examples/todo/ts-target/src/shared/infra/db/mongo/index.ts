import { client } from './config';

const connect = async () => {
  try {
    console.info('Connecting to Mongo...');
    await client.connect();
    console.info('Connected successfully to MongoDB server');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connect();
export default client;
