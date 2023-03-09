import { IntermediateAST } from '../ast/core/types.js';
import { TTranspileOptions } from '../transpilerTypes.js';
import { TClassName, TTargetDependenciesTypeScript } from '../types.js';

import { TClassTypesValues } from '../helpers/mappings.js';

export interface IIntermediateASTToTarget {
  ASTToTarget(params: IntermediateAST): TTargetCoreContent[] | TargetGeneratorError;
  formatCode(targetContent: TTargetCoreFinalContent[], config?: any): TTargetCoreFinalContent[];
  generateImports(params: TTargetCoreContent[]): TTargetCoreFinalContent[];
}
export interface IIntermediateSetupASTToTarget {
  generateSetupFiles: (
    params: IntermediateAST,
    options: TTranspileOptions,
  ) => TTargetSetupContent[] | TargetSetupGeneratorError;
}
export interface IIntermediateApiASTToTarget {
  generateApiFiles(
    params: IntermediateAST,
    options: TTranspileOptions,
  ): TTargetApiFinalContent[] | TargetApiGeneratorError;
}

export type TOutputTargetContent = {
  core: TTargetCoreFinalContent[];
  api: TTargetApiFinalContent[];
  setup?: TTargetSetupContent[];
};

export type TTargetCoreContent = {
  boundedContext: string;
  module: string;
  classType: TClassTypesValues;
  className: TClassName;
  fileContent: TTargetDependenciesTypeScript;
};

export type TTargetCoreFinalContent = {
  boundedContext: string;
  module: string;
  classType: TClassTypesValues;
  className: TClassName;
  fileContent: string;
};

export type TTargetApiContent = {
  api: string;
  classType: TClassTypesValues;
  className: TClassName;
  fileContent: TTargetDependenciesTypeScript;
};

export type TTargetApiFinalContent = {
  api: string;
  classType: TClassTypesValues;
  className: TClassName;
  fileContent: string;
};

export type TTargetSetupContent = {
  fileId: string;
  fileType: string;
  fileContent: string;
};

export type TargetGeneratorError = TargetCoreGeneratorError | TargetSetupGeneratorError;

export class TargetCoreGeneratorError extends Error {}

export class TargetApiGeneratorError extends Error {}

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
