import { IntermediateAST } from '../ast/core/types.js';
import { TTranspileOptions } from '../transpilerTypes.js';
import {
  ISetupData,
  TBoundedContextName,
  TBoundedContexts,
  TClassName,
  TClassType,
  TModuleName,
  TTargetDependenciesTypeScript,
} from '../types.js';

export type TOutputTargetContent = {
  core: TTargetCoreFinalContent[];
  setup?: TTargetSetupContent[];
};

export type TTargetCoreContent = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  classType: TClassType;
  className: TClassName;
  fileContent: TTargetDependenciesTypeScript;
};

export type TTargetCoreFinalContent = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  classType: TClassType;
  className: TClassName;
  fileContent: string;
};

export type TTargetSetupContent = {
  fileId: string;
  fileType: string;
  fileContent: string;
};

export type TTargetGeneratorParams = {
  intermediateAST: TBoundedContexts;
  setupData: ISetupData;
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string; // TODO remove this after making the package files injectable in the setup
};

export type TargetGeneratorError = TargetCoreGeneratorError | TargetSetupGeneratorError;

export class TargetCoreGeneratorError extends Error {}

export class TargetSetupGeneratorError extends Error {}

export interface ITargetGenerator {
  getTargetFileDestination(
    boundedContext: string,
    moduleName: string,
    classType: string,
    className: string,
    targetLanguage: string,
  ): { path: string; filename: string };
  generate: (
    intermediateAST: IntermediateAST,
    options: TTranspileOptions,
  ) => TOutputTargetContent | TargetGeneratorError[];
}
