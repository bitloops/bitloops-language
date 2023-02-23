import { TBoundedContexts } from '../../../ast/core/types.js';
import {
  TDependencyInjection,
  TIdentifier,
  TRepoAdapterExpression,
  TServerType,
} from '../../../types.js';
import { TGraphQLControllers, TRESTControllers } from './controller/index.js';
import { TServerInstance } from './servers/index.js';
import { TUseCases } from './useCaseDefinition/index.js';

export type GenerateServerParams = {
  serverInstance: TServerInstance;
  serverType: TServerType;
  serverIndex: number;
  bitloopsModel: TBoundedContexts;
  license?: string;
};

export type TSetupElementsPerModule = {
  useCases: TUseCases;
  restControllers: TRESTControllers;
  graphQLControllers: TGraphQLControllers;
  repoAdapters: TRepoAdapters;
  dependencyInjections: TDependencyInjections;
};

export type TRepoAdapter = {
  instanceName: TIdentifier;
} & TRepoAdapterExpression;
type TModuleName = string;
type TRepoAdapterModule = Record<TModuleName, TRepoAdapter[]>;
type TBoundedContextName = string;
export type TRepoAdapters = Record<TBoundedContextName, TRepoAdapterModule>;

export type TDependencyInjections = Record<
  TBoundedContextName,
  Record<TModuleName, TDependencyInjection[]>
>;
