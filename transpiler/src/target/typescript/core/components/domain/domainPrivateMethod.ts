import {
  isBitloopsPrimitive,
  bitloopsTypeToLangMapping,
} from '../../../../../helpers/bitloopsPrimitiveToLang.js';
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { isOkErrorReturnType } from '../../../../../helpers/typeGuards.js';
import { TDomainPrivateMethod } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const domainPrivateMethod = (
  methodName: string,
  methodInfo: TDomainPrivateMethod,
  targetLanguage: string,
): string => {
  const { privateMethod } = methodInfo;
  if (!privateMethod) return '';
  const { statements } = privateMethod;
  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
    targetLanguage,
  });
  const parametersString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: methodInfo.privateMethod.parameterDependencies,
    targetLanguage,
  });
  let mappedReturnType = methodInfo.privateMethod.returnType;

  if (isOkErrorReturnType(mappedReturnType)) {
    mappedReturnType = modelToTargetLanguage({
      type: BitloopsTypesMapping.TOkErrorReturnType,
      value: mappedReturnType,
      targetLanguage,
    });
  } else {
    if (isBitloopsPrimitive(mappedReturnType)) {
      mappedReturnType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](mappedReturnType);
    }
  }
  const ToLanguageMapping = {
    [SupportedLanguages.TypeScript]: (
      methodName: string,
      returnType: string,
      parametersString: string,
      methodStatements: string,
    ): string => {
      return `private ${methodName}${parametersString}: ${returnType} { ${methodStatements} }`;
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
export { domainPrivateMethod };
