import { isIntermediateASTValidationErrors } from './ast/core/guards/index.js';
import { IntermediateASTParser, IntermediateASTValidator } from './ast/core/index.js';
import { IntermediateAST } from './ast/core/types.js'; //to be cut
import { isParserErrors } from './parser/core/guards/index.js';
import { OriginalValidatorError } from './parser/core/types.js';
import { BitloopsParser, OriginalParserError, TParserInputData } from './parser/index.js';
import { TargetGenerator } from './target/index.js';
import { getTargetFileDestination } from './target/typescript/helpers/getTargetFileDestination.js';
import Transpiler from './Transpiler.js';
import { TTranspileOptions, TTranspileOutput } from './transpilerTypes.js';

const parser = new BitloopsParser();
const validator = new IntermediateASTValidator();
const originalLanguageASTToIntermediateModelTransformer = new IntermediateASTParser();
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
  TTranspileOptions,
  Transpiler,
  TTranspileOutput,
  getTargetFileDestination,
  isParserErrors,
  OriginalParserError,
  isIntermediateASTValidationErrors,
  OriginalValidatorError,
  IntermediateAST,
};
