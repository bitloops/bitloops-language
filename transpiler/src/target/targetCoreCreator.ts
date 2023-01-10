import { SupportedLanguages } from './supportedLanguages.js';
import { IIntermediateASTToTarget } from './types.js';
import { IntermediateASTToTarget } from './typescript/core/index.js';

export class TargetCoreGeneratorCreator {
  static create(language: string = SupportedLanguages.TypeScript): IIntermediateASTToTarget {
    if (language === SupportedLanguages.TypeScript) {
      return new IntermediateASTToTarget();
    }
    throw new Error(`Language ${language} not supported`);
  }
}
