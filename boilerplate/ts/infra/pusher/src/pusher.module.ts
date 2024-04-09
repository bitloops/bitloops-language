import { DynamicModule, Global, Inject, Logger, Module } from '@nestjs/common';
import Pusher from 'pusher';
import { constants } from './pusher.constants';
import { PusherModuleAsyncOptions, PusherModuleOptions } from './interfaces';

@Global()
@Module({})
export class PusherModule {
  constructor(@Inject(constants.PUSHER_CLIENT) private pusherClient: Pusher) {}
  static forRoot(options: PusherModuleOptions): DynamicModule {
    return {
      module: PusherModule,
      providers: [
        Logger,
        {
          provide: constants.PUSHER_CLIENT,
          useFactory: (): Pusher => new Pusher(options),
        },
        {
          provide: constants.PUSHER_CONNECTION,
          useFactory: async (client: Pusher) => {
            try {
              const connection = client;
              return connection;
            } catch (error) {
              console.log('*** In error');
              throw error;
            }
          },
          inject: [constants.PUSHER_CLIENT],
        },
      ],
      exports: [constants.PUSHER_CONNECTION],
    };
  }
  static forRootAsync(
    options: PusherModuleAsyncOptions,
    // options: MongoModuleOptions,
  ): DynamicModule {
    return {
      module: PusherModule,
      imports: options.imports || [],
      providers: [
        {
          provide: constants.PUSHER_CLIENT,
          useFactory: async (...args: any[]) => {
            const pusherModuleOptions = await options.useFactory(...args);
            return new Pusher(pusherModuleOptions);
          },
          inject: options.inject || [],
        },
        {
          provide: constants.PUSHER_CLIENT,
          useFactory: async (client: Pusher) => {
            try {
              const connection = await client;
              return connection;
            } catch (error) {
              console.log('*** In error');
              throw error;
            }
          },
          inject: [constants.PUSHER_CLIENT],
        },
      ],
      exports: [constants.PUSHER_CONNECTION],
    };
  }

  async onModuleDestroy() {
    // await this.pusherClient.close();
  }
}
