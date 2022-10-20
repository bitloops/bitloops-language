import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TConstantVariable, TTargetDependenciesTypeScript } from '../../../../../types.js';

const NEW_LINE = '\n';

const constantVariables = (
  constantVariables: TConstantVariable[],
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const constVariablesLangMapping: any = {
    [SupportedLanguages.TypeScript]: (variable: TConstantVariable): string => {
      const { name, type, value } = variable;

      if (type) {
        return `const ${name}: ${type} = ${value};`;
      } else {
        return `const ${name} = ${value};`;
      }
    },
  };

  let constDeclarationResult = '';

  for (const variable of constantVariables) {
    const constDeclaration = constVariablesLangMapping[targetLanguage](variable);
    constDeclarationResult += `${constDeclaration}${NEW_LINE}`;
  }

  return { output: constDeclarationResult, dependencies: [] };
};
export { constantVariables };
