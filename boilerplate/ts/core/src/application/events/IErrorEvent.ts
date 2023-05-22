import { IEvent } from '../../domain/events/Event.js';

export interface IErrorEvent extends IEvent {
  message: string;
  errorCode: string;
}
