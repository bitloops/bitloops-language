import {
  MongoClient,
  WithId as WithIdImport,
  Document as DocumentImport,
  ObjectId as ObjectIdImport,
} from 'mongodb';

namespace Mongo {
  export class Client extends MongoClient {}
  export class ObjectId extends ObjectIdImport {}

  export type WithId<TSchema> = WithIdImport<TSchema>;
  export type Document = DocumentImport;
}

export { Mongo };
