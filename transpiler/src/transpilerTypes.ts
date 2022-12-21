import { BitloopsIntermediateASTError } from './ast/core/types.js';
import {
  BitloopsParserError,
  BitloopsIntermediateSetupASTParserError,
  BitloopsLanguageAST,
} from './index.js';
import { BitloopsLanguageASTCoreContext } from './parser/core/types.js';
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
  originalAST: BitloopsLanguageASTCoreContext;
  originalSetupAST?: BitloopsLanguageAST;
};

export type TBitloopsCodeToOriginalASTError = BitloopsParserError;

export type TIntermediateModel = {
  intermediateModel: TBoundedContexts;
  intermediateSetupModel?: ISetupData;
};

export type TIntermediateModelError =
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
  | TIntermediateModelError
  | TTargetLanguageASTToTargetCodeError;
