import { ClassTypes } from '../../../../../helpers/mappings.js';
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TStatements } from '../../../../../types.js';
import { statementsToTargetLanguage } from '../statements/index.js';

//TODO props now must always have an id field (fix this not to be mandatory)
export const internalConstructor = (
  propsName: string,
  statements: TStatements,
  targetLanguage: string,
  classType: string,
): string => {
  const ToLanguageMapping = {
    [SupportedLanguages.TypeScript]: (propsName: string): string => {
      let superString;
      if (classType === ClassTypes.Entities) {
        superString = 'super(props, props.id)';
      } else {
        superString = 'super(props)';
      }
      let res = `private constructor(props: ${propsName}) { ${superString}; `;
      if (statements) {
        console.log('internalConstructor statements', statements);
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
