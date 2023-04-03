import { TestDataSchema } from '../structs/TestDataSchema';
import { Either } from '@bitloops/bl-boilerplate-core';
export interface TestServicePort {
  getTestData(value: string): TestDataSchema;
  sendTestData(value: TestDataSchema, value2: string): void;
  sendTestDataEither(value: TestDataSchema): Either<void, never>;
}
