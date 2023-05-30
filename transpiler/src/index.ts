import { isIntermediateASTValidationErrors } from './ast/core/guards/index.js';
import { IntermediateASTParser } from './ast/core/index.js';
import type { ValidationErrors } from './ast/core/types.js';
import { isParserErrors } from './parser/core/guards/index.js';
import type { TParserCoreInputData, TParserSetupInputData } from './parser/core/types.js';
import {
  BitloopsParser,
  type ParserSyntacticErrors,
  type TParserInputData,
} from './parser/index.js';
import { TSymbolTableSemantics } from './semantic-analysis/type-inference/types.js';
import { TargetGenerator } from './target/index.js';
import { getTargetFileDestination } from './target/typescript-nest/helpers/getTargetFileDestination.js';
import Transpiler from './Transpiler.js';
import type { TranspilerErrors, TTranspileOptions, TTranspileOutput } from './transpilerTypes.js';

const parser = new BitloopsParser();
const originalLanguageASTToIntermediateModelTransformer = new IntermediateASTParser();
const intermediateASTModelToTargetLanguageGenerator = new TargetGenerator();

const transpiler = new Transpiler(
  parser,
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
  TranspilerErrors,
  ParserSyntacticErrors,
  ValidationErrors,
  isParserErrors,
  isIntermediateASTValidationErrors,
  TSymbolTableSemantics,
};
