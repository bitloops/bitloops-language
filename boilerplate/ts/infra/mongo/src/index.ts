import {
  MongoClient,
  WithId as WithIdImport,
  Document as DocumentImport,
  ObjectId as ObjectIdImport,
  Collection as CollectionImport,
  TransactionOptions as TransactionOptionsImport,
  ClientSession as ClientSessionImport,
} from 'mongodb';
import { OptimisticConcurrency } from './decorators/concurrency';

namespace Mongo {
  export class Client extends MongoClient {}
  export class ObjectId extends ObjectIdImport {}
  export class Collection extends CollectionImport {}

  export type WithId<TSchema> = WithIdImport<TSchema>;
  export type Document = DocumentImport;
  export type TransactionOptions = TransactionOptionsImport;
  export type ClientSession = ClientSessionImport;
}

export { Mongo, OptimisticConcurrency };
