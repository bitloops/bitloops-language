import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';

// Connection URL
const baseUrl = 'mongodb://0.0.0.6:30001/?directConnection=true&replicaSet=my-replica-set';
// const baseUrl2 = 'mongodb://127.0.0.1:30001/?replicaSet=my-replica-set';

const { MONGO_URL_PREFIX, MONGO_URL_SUFFIX, MONGO_USER, MONGO_PASSWORD } = process.env;

let url: string;
if (MONGO_URL_PREFIX && MONGO_URL_SUFFIX) {
  url = `${MONGO_URL_PREFIX}${MONGO_URL_SUFFIX}`;
  if (MONGO_USER && MONGO_PASSWORD)
    url = `${MONGO_URL_PREFIX}${MONGO_USER}:${MONGO_PASSWORD}${MONGO_URL_SUFFIX}`;
} else url = baseUrl;

const client = new Mongo.Client(url);
export { client };
