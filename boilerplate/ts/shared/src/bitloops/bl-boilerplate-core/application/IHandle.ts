import { IEvent } from '../domain/events/IEvent';
import { Either } from '../Either';
import { ICoreError } from '../ICoreError';

export interface IHandle {
  get event(): any;
  get boundedContext(): string;
  handle(event: IEvent<any>): Promise<Either<any, ICoreError>>;
}
