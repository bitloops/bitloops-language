import { IntermediateAST } from '../../ast/core/types.js';

export interface IIntermediateModelToASTTargetLanguageTransformer {
  transform(intermediateModel: IntermediateAST): IntermediateAST;
}
