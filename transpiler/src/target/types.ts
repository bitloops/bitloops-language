import {
  ISetupData,
  TBoundedContextName,
  TBoundedContexts,
  TClassName,
  TClassType,
  TModuleName,
} from '../types.js';

export type TBitloopsOutputTargetContent = {
  boundedContext: TBoundedContextName;
  module: TModuleName;
  classType: TClassType;
  className: TClassName;
  fileContent: string;
}[];

export type TBitloopsTargetSetupContent = {
  fileId: string;
  fileType: string;
  fileContent: string;
}[];

export type TBitloopsTargetGeneratorParams = {
  intermediateAST: TBoundedContexts;
  setupData: ISetupData;
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string; // TODO remove this after making the package files injectable in the setup
};

export class BitloopsTargetGeneratorError extends Error {}

export class BitloopsTargetSetupGeneratorError extends Error {}

export interface IBitloopsTargetGenerator {
  getTargetFileDestination(
    boundedContext: string,
    moduleName: string,
    classType: string,
    className: string,
    targetLanguage: string,
  ): { path: string; filename: string };
  generate: (
    params: TBitloopsTargetGeneratorParams,
  ) => TBitloopsOutputTargetContent | BitloopsTargetGeneratorError;
  generateSetup: (
    params: TBitloopsTargetGeneratorParams,
  ) => TBitloopsTargetSetupContent | BitloopsTargetSetupGeneratorError;
}
