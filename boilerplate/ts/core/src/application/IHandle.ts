import { Either } from '../Either';
import { ICoreError } from '../ICoreError';
import { IEvent } from '../domain/events/Event.js';

export interface IHandle {
  get event(): any;
  get boundedContext(): string;
  handle(event: IEvent): Promise<Either<any, ICoreError>>;
}
