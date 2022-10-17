import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { TPackages } from '../../../types.js';
import { BitloopsTypesMapping } from '../commons/index.js';
import { modelToTargetLanguage } from '../index.js';

const packagesToTypescriptTargetLanguage = (
  variable: TPackages,
  targetLanguage: string,
): string => {
  let res = '';
  for (const packageData of Object.values(variable)) {
    const { port } = packageData;
    res += modelToTargetLanguage({
      type: BitloopsTypesMapping.TPackagePort,
      value: port,
      targetLanguage,
    });
  }
  return res;
};

const packagesToTargetLanguageMapping = {
  [SupportedLanguages.TypeScript]: packagesToTypescriptTargetLanguage,
};

export const packagesToTargetLanguage = (variable: TPackages, targetLanguage: string): string => {
  return packagesToTargetLanguageMapping[targetLanguage](variable, targetLanguage);
};
