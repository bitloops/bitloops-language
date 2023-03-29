import { IEvent } from '../domain/events/IEvent';

// TODO Add generic to IHandle
export interface IHandle {
  get event(): any;
  get boundedContext(): string;
  handle(event: IEvent<any>): Promise<void>;
}
