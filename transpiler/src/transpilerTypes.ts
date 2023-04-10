import { IntermediateASTError } from './ast/core/types.js';
import { type OriginalParserError } from './parser/index.js';
import { TargetGeneratorError, TOutputTargetContent } from './target/types.js';

export type TTranspileOptions = {
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string;
};

export type TTranspileOutput = TOutputTargetContent;

export type TTranspileError = OriginalParserError | IntermediateASTError | TargetGeneratorError;
