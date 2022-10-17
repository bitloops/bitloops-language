import {
  TBoundedContexts,
  TBoundedContextName,
  TClassName,
  TClassType,
  TModuleName,
} from '../../types.js';
import { BitloopsIntermediateASTToTarget } from './modelToTargetLanguage/core/index.js';

export type TBitloopsTargetContent = {
  [boundedContext: TBoundedContextName]: {
    [module: TModuleName]: {
      [classType in TClassType]: {
        [className: TClassName]: {
          content: string;
        };
      };
    };
  };
};

export interface IBitloopsTargetGenerator {
  generate: (
    intermediateAST: TBoundedContexts,
  ) => TBitloopsTargetContent | BitloopsTargetGeneratorError;
}

export class BitloopsTargetGeneratorError extends Error {}

export class BitloopsTargetGenerator implements IBitloopsTargetGenerator {
  generate(
    intermediateAST: TBoundedContexts,
    prettierConfig?: any,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    const bitloopsTargetGenerator = new BitloopsIntermediateASTToTarget();
    bitloopsTargetGenerator.astToTarget(intermediateAST);
    return bitloopsTargetGenerator.result;
  }
}
