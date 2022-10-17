import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TStatements } from '../../../../../types.js';
import { statementsToTargetLanguage } from '../statements/index.js';

//TODO constructor also with id??
export const internalConstructor = (
  propsName: string,
  statements: TStatements,
  targetLanguage: string,
): string => {
  const ToLanguageMapping = {
    [SupportedLanguages.TypeScript]: (propsName: string): string => {
      let res = `private constructor(props: ${propsName}) { super(props); `;
      if (statements) {
        const statementsResult = statementsToTargetLanguage(statements, targetLanguage);
        res += statementsResult;
      }
      res += '}';
      return res;
    },
  };

  const result = ToLanguageMapping[targetLanguage](propsName);
  return result;
};
