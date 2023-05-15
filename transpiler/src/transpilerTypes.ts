import { ValidationErrors } from './ast/core/types.js';
import { type ParserSyntacticErrors } from './parser/index.js';
import { TOutputTargetContent } from './target/types.js';

export type TTranspileOptions = {
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string;
};

export type TTranspileOutput = TOutputTargetContent;

export type TranspilerErrors = ParserSyntacticErrors | ValidationErrors;
