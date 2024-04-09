import { ModuleMetadata } from '@nestjs/common';
import { Options } from 'pusher';

export interface PusherModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<PusherModuleOptions> | PusherModuleOptions;
  inject?: any[];
}

export type PusherModuleOptions = Options;
