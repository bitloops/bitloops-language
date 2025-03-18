import { TEventMetadata } from '../events/IEvent';
import { Message } from './IMessage';

export type SystemEventProps<T> = {
  boundedContextId: string;
  name: string; // TODO or commandHandlerName
  result: T;
  metadata?: Partial<TEventMetadata>;
};

export class SystemEvent<T> extends Message {
  readonly name: string;
  readonly result: T;
  declare metadata: TEventMetadata;
  constructor({ boundedContextId, name, result, metadata }: SystemEventProps<T>) {
    super(metadata);
    this.metadata.boundedContextId = boundedContextId;
    this.name = name;
    this.result = result;
  }
}
