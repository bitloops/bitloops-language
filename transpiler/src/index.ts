import { isIntermediateASTValidationErrors } from './ast/core/guards/index.js';
import { IntermediateASTParser } from './ast/core/index.js';
import { isParserErrors } from './parser/core/guards/index.js';
import type { TParserCoreInputData, TParserSetupInputData } from './parser/core/types.js';
import {
  BitloopsParser,
  type ParserSyntacticErrors,
  type TParserInputData,
} from './parser/index.js';
import { SemanticAnalyzer } from './semantic-analysis/IntermediateASTValidator.js';
import { TargetGenerator } from './target/index.js';
import { getTargetFileDestination } from './target/typescript-nest/helpers/getTargetFileDestination.js';
import Transpiler from './Transpiler.js';
import type { TTranspileOptions, TTranspileOutput } from './transpilerTypes.js';

const parser = new BitloopsParser();
const originalLanguageASTToIntermediateModelTransformer = new IntermediateASTParser();
const validator = new SemanticAnalyzer();
const intermediateASTModelToTargetLanguageGenerator = new TargetGenerator();

const transpiler = new Transpiler(
  parser,
  validator,
  originalLanguageASTToIntermediateModelTransformer,
  intermediateASTModelToTargetLanguageGenerator,
);

export {
  transpiler,
  TParserInputData,
  TParserCoreInputData,
  TParserSetupInputData,
  TTranspileOptions,
  Transpiler,
  TTranspileOutput,
  getTargetFileDestination,
  isParserErrors,
  ParserSyntacticErrors,
  isIntermediateASTValidationErrors,
};
