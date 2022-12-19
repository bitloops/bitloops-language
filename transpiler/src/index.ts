import { BitloopsIntermediateASTParser } from './ast/core/index.js';
import { BitloopsIntermediateSetupASTParser } from './ast/setup/index.js';
import { BitloopsParser, BitloopsSetupParser } from './parser/index.js';
import { IntermediateModelToASTTargetTransformer } from './target/ast/index.js';
import { BitloopsTargetGenerator } from './target/index.js';
import Transpiler from './Transpiler.js';

export {
  BitloopsParser,
  BitloopsSetupParser,
  IBitloopsParser,
  IBitloopsSetupParser,
  BitloopsLanguageAST,
  BitloopsLanguageASTContext,
  BitloopsLanguageSetupAST,
  BitloopsParserError,
  BitloopsSetupParserError,
} from './parser/index.js';

export {
  BitloopsIntermediateASTParser,
  // IBitloopsIntermediateASTParser,
  // BitloopsIntermediateASTParserError,
} from './ast/core/index.js';

export { BitloopsIntermediateSetupASTParser } from './ast/setup/index.js';

export {
  IBitloopsIntermediateSetupASTParser,
  BitloopsIntermediateSetupASTParserError,
} from './ast/setup/types.js';

export { BitloopsTargetGenerator } from './target/index.js';

const parser = new BitloopsParser();
const setupParser = new BitloopsSetupParser();
const originalLanguageASTToIntermediateModelTransformer = new BitloopsIntermediateASTParser();
const originalLanguageASTToIntermediateModelSetupTransformer =
  new BitloopsIntermediateSetupASTParser();
const modelToTargetASTTransformer = new IntermediateModelToASTTargetTransformer();
const targetLanguageASTToTargetCodeGenerator = new BitloopsTargetGenerator();

const transpiler = new Transpiler(
  parser,
  setupParser,
  originalLanguageASTToIntermediateModelTransformer,
  originalLanguageASTToIntermediateModelSetupTransformer,
  modelToTargetASTTransformer,
  targetLanguageASTToTargetCodeGenerator,
);

export { transpiler };
