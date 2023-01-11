import { IntermediateASTParser } from './ast/core/index.js';
import { BitloopsParser, TParserInputData } from './parser/index.js';
import { TargetGenerator } from './target/index.js';
import { getTargetFileDestination } from './target/typescript/helpers/getTargetFileDestination.js';
import Transpiler from './Transpiler.js';
import { TTranspileOptions, TTranspileOutput } from './transpilerTypes.js';

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
  TTranspileOptions,
  Transpiler,
  TTranspileOutput,
  getTargetFileDestination,
};
