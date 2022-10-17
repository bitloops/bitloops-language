import { TBitloopsTargetContent, TBitloopsTargetGeneratorParams } from '../../../../types.js';
import { BitloopsTargetGeneratorError } from '../../../BitloopsTargetGeneratorError.js';
import { modelToTargetLanguage } from '../modelToTargetLanguage.js';

interface IBitloopsIntermediateASTToTarget {
  ASTToTarget(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError;
}

export class BitloopsIntermediateASTToTarget implements IBitloopsIntermediateASTToTarget {
  private _result: TBitloopsTargetContent | BitloopsTargetGeneratorError;

  get result(): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    return this._result;
  }

  ASTToTarget(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    this._result = modelToTargetLanguage();
    // TODO prett

    // TODO imports
  }
}
