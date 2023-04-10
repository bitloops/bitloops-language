import { SupportedLanguages } from './supportedLanguages.js';
import { IIntermediateASTToTarget } from './types.js';
import { IntermediateASTToTarget } from './typescript-nest/core/index.js';

export class TargetCoreGeneratorCreator {
  static create(language: string = SupportedLanguages.TypeScript): IIntermediateASTToTarget {
    if (language === SupportedLanguages.TypeScriptNest) {
      return new IntermediateASTToTarget();
    }
    throw new Error(`Language ${language} not supported`);
  }
}
