import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions } from 'nats';

import { JetstreamModuleFeatureConfig } from './interfaces/module-feature-input.interface';
import { JetstreamCoreModule } from './jetstream-core.module';

@Module({})
export class JetstreamModule {
  static forRoot(connectionOptions: ConnectionOptions): DynamicModule {
    return {
      module: JetstreamModule,
      imports: [JetstreamCoreModule.forRoot(connectionOptions)],
    };
  }

  static forFeature(config: JetstreamModuleFeatureConfig): DynamicModule {
    return {
      module: JetstreamModule,
      imports: [JetstreamCoreModule.forFeature(config)],
    };
  }
}
