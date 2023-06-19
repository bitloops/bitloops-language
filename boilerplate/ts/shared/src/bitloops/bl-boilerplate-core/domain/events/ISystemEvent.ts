import { Message } from '../messages/IMessage.js';
import { TEventMetadata } from './IEvent.js';

export class SystemEvent extends Message {
  public isOk: boolean;
  public data?: any; // If isOk is true, then data is defined
  public error?: any; // If isOk is false, then error is defined
  declare metadata: TEventMetadata;
  constructor(
    boundedContextId: string,
    isOk: boolean,
    payload: any,
    metadata?: Partial<TEventMetadata>,
  ) {
    super(metadata);
    this.metadata.boundedContextId = boundedContextId;
    this.isOk = isOk;
    if (isOk) {
      this.data = payload;
    }
    if (!isOk) {
      this.error = payload;
    }
  }
}
