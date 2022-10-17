import { TBitloopsTargetContent, TBitloopsTargetGeneratorParams } from '../../types.js';

export class BitloopsTargetGeneratorError extends Error {}

export interface IBitloopsTargetGenerator {
  generate: (
    params: TBitloopsTargetGeneratorParams,
  ) => TBitloopsTargetContent | BitloopsTargetGeneratorError;
}

export class BitloopsTargetGenerator implements IBitloopsTargetGenerator {
  generate(
    _params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    return 'mock' as any;
  }
}
