import { isOkErrorReturnType } from '../../../../../helpers/typeGuards.js';
import { TDomainPublicMethod, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const domainPublicMethod = (
  methodName: string,
  methodInfo: TDomainPublicMethod,
): TTargetDependenciesTypeScript => {
  const { publicMethod } = methodInfo;
  const { statements, parameterDependencies, returnType } = publicMethod;
  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const parametersString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameterDependencies,
  });

  if (!isOkErrorReturnType(returnType)) {
    throw new Error('Method return type is wrong!');
  }

  const mappedReturnType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: returnType,
  });
  const ToLanguageMapping = (
    methodName: string,
    returnType: string,
    parametersString: string,
    methodStatements: string,
  ): string => {
    return `public ${methodName}${parametersString}: ${returnType} { ${methodStatements} }`;
  };
  const result = ToLanguageMapping(
    methodName,
    mappedReturnType.output,
    parametersString.output,
    statementsString.output,
  );
  return {
    output: result,
    dependencies: [
      ...statementsString.dependencies,
      ...parametersString.dependencies,
      ...mappedReturnType.dependencies,
    ],
  };
};
export { domainPublicMethod };
