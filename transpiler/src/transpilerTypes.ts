import { IntermediateASTError } from './ast/core/types.js';
import { OriginalParserError } from './parser/index.js';
import { TargetGeneratorError } from './target/types.js';

export type TTranspileOptions = {
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string;
};

export type TTranspileError = OriginalParserError | IntermediateASTError | TargetGeneratorError;
