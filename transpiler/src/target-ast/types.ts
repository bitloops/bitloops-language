import { TIntermediateModel } from '../transpilerTypes.js';

export interface IIntermediateModelToASTTargetLanguageTransformer {
  transform(intermediateModel: TIntermediateModel): TIntermediateModel;
}
