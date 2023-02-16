import { TestDataSchema } from '../structs/TestDataSchema';
export interface TestServicePort {
  getTestData(value: string): TestDataSchema;
  sendTestData(value: TestDataSchema, value2: string): void;
}
