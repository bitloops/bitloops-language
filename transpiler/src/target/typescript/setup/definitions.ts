import { TBoundedContexts } from '../../../ast/core/types.js';
import { TServerType } from '../../../types.js';
import { TServerInstance } from './servers/index.js';

export type GenerateServerParams = {
  serverInstance: TServerInstance;
  serverType: TServerType;
  serverIndex: number;
  bitloopsModel: TBoundedContexts;
  license?: string;
};
