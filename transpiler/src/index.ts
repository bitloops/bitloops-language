import { IntermediateASTParser } from './ast/core/index.js';
import { BitloopsParser } from './parser/index.js';
import { TargetGenerator } from './target/index.js';
import Transpiler from './Transpiler.js';

const parser = new BitloopsParser();
const originalLanguageASTToIntermediateModelTransformer = new IntermediateASTParser();
const intermediateASTModelToTargetLanguageGenerator = new TargetGenerator();

const transpiler = new Transpiler(
  parser,
  originalLanguageASTToIntermediateModelTransformer,
  intermediateASTModelToTargetLanguageGenerator,
);

export { transpiler };
