import { TBoundedContexts } from '../../../../types.js';
import { BitloopsTargetGeneratorError, TBitloopsTargetContent } from '../../index.js';
import { modelToTargetLanguage } from '../modelToTargetLanguage.js';

interface IBitloopsIntermediateASTToTarget {
  astToTarget(
    intermediateAST: TBoundedContexts,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError;
}

export class BitloopsIntermediateASTToTarget implements IBitloopsIntermediateASTToTarget {
  private _result: TBitloopsTargetContent | BitloopsTargetGeneratorError;

  get result(): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    return this._result;
  }
  astToTarget(
    intermediateAST: TBoundedContexts,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    this._result = modelToTargetLanguage();
  }
}
