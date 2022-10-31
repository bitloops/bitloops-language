import { TDomainCreateMethod, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { internalConstructor } from './index.js';

// TODO refactor this with domainCreate method which is similar (only the constructor changes)
export const domainCreateEntity = (create: TDomainCreateMethod): TTargetDependenciesTypeScript => {
  const { parameterDependency, returnType, statements } = create;

  const propsName = create.parameterDependency.type;
  const returnOkType = returnType.ok;

  const producedConstructor = internalConstructor(propsName, statements, ClassTypes.Entities);

  const parameterString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependency,
    value: parameterDependency,
  });

  const returnTypeModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: returnType,
  });

  const returnOkCreateStatement = `return ok(new ${returnOkType}(props));`;
  const result = `${producedConstructor.output} public static create(${parameterString.output}): ${returnTypeModel.output} { ${returnOkCreateStatement} }`;

  return {
    output: result,
    dependencies: [
      ...producedConstructor.dependencies,
      ...parameterString.dependencies,
      ...returnTypeModel.dependencies,
    ],
  };
};
