import { IEvent } from '../../domain/events/IEvent';

export interface IErrorEvent<T> extends IEvent<T> {
  message: string;
  errorCode: string;
}
