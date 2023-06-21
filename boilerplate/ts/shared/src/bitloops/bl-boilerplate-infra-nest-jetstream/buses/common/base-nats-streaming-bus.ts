import { NatsConnection, JetStreamClient, MsgHdrs, headers } from 'nats';
import { Logger } from '@nestjs/common';
import { NestjsJetstream } from '@bitloops/bl-boilerplate-infra-nest-jetstream/nestjs-jetstream.class';

/**
 * Retention Policy
 * 1.Limits Policy (default): This policy retains messages until a defined storage limit (bytes, messages, or age) is reached. When the limit is reached, the oldest messages are removed first. This is the default policy and works for most use cases where you want to keep a certain number of recent messages but are not concerned about keeping all messages indefinitely.
 * 2.Interest Policy: This policy retains messages as long as there is at least one consumer that has not acknowledged them. Once all consumers have acknowledged a message, it can be removed.
 * Example of setting retention policy
 * 
 * const streamConfig = {
  name: "my-stream",
  retention: "limits", // This is actually the default, so technically you don't need to specify it
  max_msgs: 1000000, // Maximum number of messages in the stream
  max_bytes: 1024 * 1024 * 1024, // Maximum total size of the messages in the stream (1 GB in this example)
  max_age: 3600 * 1000, // Maximum age of messages in the stream in milliseconds (1 hour in this example)
  storage: "file", // Storage backend ('file' or 'memory')
};

await js.addStream(streamConfig);
 */

export abstract class BaseNatsStreamingBus {
  protected readonly logger: Logger;
  protected nc: NatsConnection;
  protected js: JetStreamClient;

  constructor(
    protected readonly jetStreamProvider: NestjsJetstream, // Adjust types accordingly
    protected readonly asyncLocalStorage: any, // Adjust types accordingly
  ) {
    this.nc = this.jetStreamProvider.getConnection();
    this.js = this.nc.jetstream();
    this.logger = new Logger(this.constructor.name);
  }

  protected getCorrelationId() {
    return this.asyncLocalStorage.getStore()?.get('correlationId');
  }

  protected getContext() {
    return this.asyncLocalStorage.getStore()?.get('context') || {};
  }

  protected generateHeaders(metadata: any): MsgHdrs {
    // TODO We have added ?? {} because of trace message which does not have metadata
    // Remove this if trace message gets updated,  Traceable decorator should
    // create a new Message class
    const h = headers();
    for (const [key, value] of Object.entries(metadata ?? {})) {
      if (key === 'context' && value) {
        h.append(key, JSON.stringify(value));
        continue;
      }
      const header = value?.toString();
      if (header) {
        h.append(key, header);
      }
    }
    return h;
  }

  // ... other common methods
}
