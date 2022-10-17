import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { isOkErrorReturnType } from '../../../helpers/typeGuards.js';
import { TDomainPublicMethod } from '../../../types.js';
import { BitloopsTypesMapping } from '../commons/index.js';
import { modelToTargetLanguage } from '../index.js';

const domainPublicMethod = (
  methodName: string,
  methodInfo: TDomainPublicMethod,
  targetLanguage: string,
): string => {
  const { publicMethod } = methodInfo;
  const { statements, parameterDependencies, returnType } = publicMethod;
  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
    targetLanguage,
  });
  const parametersString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameterDependencies,
    targetLanguage,
  });

  if (!isOkErrorReturnType(returnType)) {
    throw new Error('Method return type is wrong!');
  }

  const mappedReturnType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: returnType,
    targetLanguage,
  });
  const ToLanguageMapping = {
    [SupportedLanguages.TypeScript]: (
      methodName: string,
      returnType: string,
      parametersString: string,
      methodStatements: string,
    ): string => {
      return `public ${methodName}${parametersString}: ${returnType} { ${methodStatements} }`;
    },
  };
  const result = ToLanguageMapping[targetLanguage](
    methodName,
    mappedReturnType,
    parametersString,
    statementsString,
  );
  return result;
};
export { domainPublicMethod };
