import { BitloopsIntermediateASTParser } from '../ast/core/index.js';
import { BitloopsParser } from '../parser/index.js';
import { BitloopsTargetGenerator } from '../target/index.js';
import Transpiler from './Transpiler.js';

const parser = new BitloopsParser();
const originalLanguageASTToIntermediateModelTransformer = new BitloopsIntermediateASTParser();
const targetLanguageASTToTargetCodeGenerator = new BitloopsTargetGenerator();

const transpiler = new Transpiler(
  parser,
  originalLanguageASTToIntermediateModelTransformer,
  targetLanguageASTToTargetCodeGenerator,
);

export { transpiler };
