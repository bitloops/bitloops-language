import {
  MongoClient,
  WithId as WithIdImport,
  Document as DocumentImport,
  ObjectId as ObjectIdImport,
  Collection as CollectionImport,
} from 'mongodb';

namespace Mongo {
  export class Client extends MongoClient {}
  export class ObjectId extends ObjectIdImport {}
  export class Collection extends CollectionImport {}

  export type WithId<TSchema> = WithIdImport<TSchema>;
  export type Document = DocumentImport;
}

export { Mongo };
