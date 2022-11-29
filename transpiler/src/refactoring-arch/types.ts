import { BitloopsLanguageASTContext, BitloopsParserError } from '../parser/core/types.js';
import { BitloopsLanguageSetupAST, BitloopsSetupParserError } from '../parser/setup/types.js';
import {
  BitloopsTargetGeneratorError,
  BitloopsTargetSetupGeneratorError,
  TBitloopsOutputTargetContent,
  TBitloopsTargetSetupContent,
} from '../target/types.js';
import { IntermediateASTParserError, IntermediateASTValidationError } from '../ast/core/types.js';
import { BitloopsIntermediateSetupASTParserError } from '../ast/setup/types.js';
import { ISetupData, TBoundedContexts } from '../types.js';

export type TTranspileOptions = {
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string;
};

export type TBitloopsCodeToOriginalAST = {
  originalAST: BitloopsLanguageASTContext;
  originalSetupAST?: BitloopsLanguageSetupAST;
};

export type TBitloopsCodeToOriginalASTError = BitloopsSetupParserError | BitloopsParserError;

export type TOriginalASTToIntermediateModel = {
  intermediateModel: TBoundedContexts;
  intermediateSetupModel?: ISetupData;
};

export type TOriginalASTToIntermediateModelError =
  | IntermediateASTParserError
  | IntermediateASTValidationError
  | BitloopsIntermediateSetupASTParserError;

export type TTargetLanguageASTToTargetCode = {
  targetCode: TBitloopsOutputTargetContent;
  targetSetupCode?: TBitloopsTargetSetupContent;
};

export type TTargetLanguageASTToTargetCodeError =
  | BitloopsTargetGeneratorError
  | BitloopsTargetSetupGeneratorError;

export type TTranspileError =
  | TBitloopsCodeToOriginalASTError
  | TOriginalASTToIntermediateModelError
  | TTargetLanguageASTToTargetCodeError;
