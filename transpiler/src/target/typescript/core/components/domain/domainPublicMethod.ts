import { TDomainPublicMethod, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const domainPublicMethod = (methodInfo: TDomainPublicMethod): TTargetDependenciesTypeScript => {
  const { publicMethod } = methodInfo;
  const { statements, parameters, returnType } = publicMethod;
  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const parametersString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: { parameters },
  });

  const mappedReturnType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: { returnType },
  });
  const methodName = publicMethod.identifier;
  const returnTypeOuput = mappedReturnType.output;
  const parametersOutput = parametersString.output;
  const methodStatements = statementsString.output;
  return {
    output: `public ${methodName}${parametersOutput}: ${returnTypeOuput} { ${methodStatements} }`,
    dependencies: [
      ...statementsString.dependencies,
      ...parametersString.dependencies,
      ...mappedReturnType.dependencies,
    ],
  };
};
export { domainPublicMethod };
