import { UnexpectedError } from './UnexpectedError';
import { fail } from '../../Either';

export function ReturnUnexpectedError() {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: unknown) {
        return fail(new UnexpectedError((error as Error).message));
      }
    };
  };
}
