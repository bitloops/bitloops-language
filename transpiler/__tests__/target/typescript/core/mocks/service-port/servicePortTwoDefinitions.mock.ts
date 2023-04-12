import { Application, Either } from '@bitloops/bl-boilerplate-core';
import { TestDataSchema } from '../structs/test-data-schema.struct';
export interface TestServicePort {
  getTestData(value: string): Promise<Either<TestDataSchema, Application.Repo.Errors.Unexpected>>;
  sendTestData(
    value: TestDataSchema,
    value2: string,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>>;
  sendTestDataEither(
    value: TestDataSchema,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>>;
}
