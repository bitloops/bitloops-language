import { TBitloopsTargetContent, TBitloopsTargetGeneratorParams } from '../types.js';
import { BitloopsTargetGeneratorError } from './BitloopsTargetGeneratorError.js';
import { BitloopsIntermediateASTToTarget } from './typescript/modelToTargetLanguage/core/index.js';

export interface IBitloopsTargetGenerator {
  generate: (
    params: TBitloopsTargetGeneratorParams,
  ) => TBitloopsTargetContent | BitloopsTargetGeneratorError;
}

export class BitloopsTargetGenerator implements IBitloopsTargetGenerator {
  generate(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    const bitloopsTargetGenerator = new BitloopsIntermediateASTToTarget();
    return bitloopsTargetGenerator.ASTToTarget(params);
  }
}
