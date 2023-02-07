import { Application } from '@bitloops/bl-boilerplate-core';
import { TransactionOptions } from 'mongodb';

export function OptimisticConcurrency() {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const self = this as any;
      const session = self.client.startSession();
      try {
        // Lock write
        const transactionOptions: TransactionOptions = {
          readConcern: { level: 'snapshot' },
          writeConcern: { w: 'majority' },
        };
        session.startTransaction(transactionOptions);
        // Read current db aggregate
        const aggregateRoot = args[0] as any; // Domain.Aggregate<any>;
        const toBeMutated = await self.getById(aggregateRoot.id, session);
        if (toBeMutated === null) return new Application.Repo.Errors.NotFound(aggregateRoot.id);

        const version = toBeMutated.version;
        if (aggregateRoot.version !== version) {
          return new Application.Repo.Errors.Concurrency(aggregateRoot.id);
        }
        aggregateRoot.incrementVersion();

        // Call the original mutating method
        const result = await originalMethod.apply(self, args);

        await session.commitTransaction();
        return result;
      } catch (e) {
        console.log(e);
        await session.abortTransaction();
        //throw
      } finally {
        session.endSession();
      }
    };
    return descriptor;
  };
}
