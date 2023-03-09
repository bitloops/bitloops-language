import { SupportedLanguages } from './supportedLanguages.js';
import { IIntermediateApiASTToTarget } from './types.js';
import { IntermediateApiASTToTarget } from './typescript/api/index.js';

export class TargetApiGeneratorCreator {
  static create(language: string = SupportedLanguages.TypeScript): IIntermediateApiASTToTarget {
    if (language === SupportedLanguages.TypeScript) {
      return new IntermediateApiASTToTarget();
    }
    throw new Error(`Language ${language} not supported`);
  }
}
