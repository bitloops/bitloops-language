import {
  TBoundedContexts,
  TGraphQLServerInstance,
  TRESTServerInstance,
  TServerType,
} from '../../../types.js';

export type GenerateServerParams = {
  serverInstance: TRESTServerInstance | TGraphQLServerInstance;
  serverType: TServerType;
  serverIndex: number;
  bitloopsModel: TBoundedContexts;
  license?: string;
};
