import { BitloopsIntermediateASTParser } from '../ast/core/index.js';
import { IntermediateASTValidator } from '../ast/core/IntermediateASTValidator.js';
import { BitloopsIntermediateSetupASTParser } from '../ast/setup/index.js';
import { BitloopsParser, BitloopsSetupParser } from '../parser/index.js';
import { BitloopsTargetGenerator } from '../target/index.js';
import Transpiler from './Transpiler.js';

const parser = new BitloopsParser();
const setupParser = new BitloopsSetupParser();
const intermediateASTValidator = new IntermediateASTValidator();
const originalLanguageASTToIntermediateModelTransformer = new BitloopsIntermediateASTParser(
  intermediateASTValidator,
);
const originalLanguageASTToIntermediateModelSetupTransformer =
  new BitloopsIntermediateSetupASTParser();
const targetLanguageASTToTargetCodeGenerator = new BitloopsTargetGenerator();

const transpiler = new Transpiler(
  parser,
  setupParser,
  originalLanguageASTToIntermediateModelTransformer,
  originalLanguageASTToIntermediateModelSetupTransformer,
  targetLanguageASTToTargetCodeGenerator,
);

export { transpiler };
