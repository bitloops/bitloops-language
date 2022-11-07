import { TDomainCreateMethod, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { internalConstructor } from './index.js';
import { isThisDeclaration } from '../../../../../helpers/typeGuards.js';
import { BitloopsPrimTypeIdentifiers } from '../../type-identifiers/bitloopsPrimType.js';

// TODO refactor this with domainCreate method which is similar (only the constructor changes)
export const domainCreateEntity = (create: TDomainCreateMethod): TTargetDependenciesTypeScript => {
  const { parameterDependency, returnType, statements } = create;

  const statementsResult = {
    thisStatements: [],
    restStatements: [],
  };

  for (const statement of statements) {
    if (isThisDeclaration(statement)) {
      statementsResult.thisStatements.push(statement);
    } else {
      statementsResult.restStatements.push(statement);
    }
  }

  const propsName = create.parameterDependency.type;
  const returnOkType = returnType.ok;

  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(propsName)) {
    throw new Error('Entity props type of createMethod cannot be an array');
  }

  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(returnOkType)) {
    throw new Error('Entity return type of createMethod cannot be an array');
  }
  const producedConstructor = internalConstructor(
    propsName,
    statementsResult.thisStatements,
    ClassTypes.Entities,
  );

  let statementsModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statementsResult.restStatements,
  });

  const parameterString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependency,
    value: parameterDependency,
  });

  const returnTypeModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: returnType,
  });

  const statementValues = statements.map((statement) => statement.valueOf());
  const hasReturnStatements: boolean =
    statementValues.filter(
      (statement) => Object.keys(statement)[0] === BitloopsTypesMapping.TReturnStatement,
    ).length === 0;
  if (hasReturnStatements || statements.length === 0) {
    statementsModel = {
      output: statementsModel.output.concat(`return ok(new ${returnOkType}(props));`),
      dependencies: statementsModel.dependencies,
    };
  }

  const result = `${producedConstructor.output} public static create(${parameterString.output}): ${returnTypeModel.output} { ${statementsModel.output} }`;

  return {
    output: result,
    dependencies: [
      ...producedConstructor.dependencies,
      ...parameterString.dependencies,
      ...returnTypeModel.dependencies,
      ...statementsModel.dependencies,
    ],
  };
};
