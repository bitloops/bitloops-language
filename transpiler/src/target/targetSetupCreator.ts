import { SupportedLanguages } from './supportedLanguages.js';
import { IIntermediateSetupASTToTarget } from './types.js';
import { IntermediateSetupASTToTarget } from './typescript/setup/setup-typescript.js';

export class TargetSetupGeneratorCreator {
  static create(language: string = SupportedLanguages.TypeScript): IIntermediateSetupASTToTarget {
    if (language === SupportedLanguages.TypeScript) {
      return new IntermediateSetupASTToTarget();
    }
    throw new Error(`Language ${language} not supported`);
  }
}
