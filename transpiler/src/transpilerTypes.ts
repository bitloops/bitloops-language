import { BitloopsIntermediateASTError } from './ast/core/types.js';
import {
  BitloopsLanguageASTContext,
  BitloopsLanguageSetupAST,
  BitloopsSetupParserError,
  BitloopsParserError,
  BitloopsIntermediateSetupASTParserError,
} from './index.js';
import {
  TBitloopsOutputTargetContent,
  TBitloopsTargetSetupContent,
  BitloopsTargetGeneratorError,
  BitloopsTargetSetupGeneratorError,
} from './target/types.js';
import { TBoundedContexts, ISetupData } from './types.js';

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
  | BitloopsIntermediateASTError
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
