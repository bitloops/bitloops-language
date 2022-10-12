import {
  MongoClient as MongoClientImport,
  WithId as WithIdImport,
  Document as DocumentImport,
  ObjectId as ObjectIdImport,
} from 'mongodb';

namespace Mongo {
  export class MongoClient extends MongoClientImport {}
  export class ObjectId extends ObjectIdImport {}

  export type WithId<TSchema> = WithIdImport<TSchema>;
  export type Document = DocumentImport;
}

export { Mongo };
