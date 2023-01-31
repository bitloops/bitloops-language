import { IEvent } from '../domain/events/IEvent';

// TODO Add generic to IHandle
export interface IHandle {
  handle(event: IEvent): Promise<void>;
}
