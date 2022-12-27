import {
  PropsIdentifierKey,
  TDomainCreateMethod,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { internalConstructor } from './index.js';
import { isThisDeclaration } from '../../../../../helpers/typeGuards.js';
import { BitloopsPrimTypeIdentifiers } from '../../type-identifiers/bitloopsPrimType.js';

// TODO refactor this with domainCreate method which is similar (only the constructor changes)
export const domainCreateEntity = (
  variable: TDomainCreateMethod,
): TTargetDependenciesTypeScript => {
  const { domainCreateParameter, returnType, statements } = variable.create;

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

  const propsNameType = domainCreateParameter[PropsIdentifierKey];
  const domainCreateParameterValue = domainCreateParameter.value;
  const returnOkType = returnType.ok.type;

  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(returnOkType)) {
    throw new Error('Entity return type of createMethod cannot be an array');
  }

  const { output: propsName, dependencies: propsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TDomainConstructorParameter,
    value: propsNameType,
  });

  const { output: returnOkTypeName, dependencies: returnOkTypeDependencies } =
    modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: returnOkType },
    });

  const producedConstructor = internalConstructor(
    propsName,
    statementsResult.thisStatements,
    ClassTypes.Entity,
  );

  let statementsModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statementsResult.restStatements,
  });

  const returnTypeModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: { returnType },
  });

  const statementValues = statements.map((statement) => statement.valueOf());
  const hasReturnStatements: boolean =
    statementValues.filter(
      (statement) => Object.keys(statement)[0] === BitloopsTypesMapping.TReturnStatement,
    ).length === 0;
  if (hasReturnStatements || statements.length === 0) {
    statementsModel = {
      output: statementsModel.output.concat(`return ok(new ${returnOkTypeName}(props));`),
      dependencies: statementsModel.dependencies,
    };
  }

  const result = `${producedConstructor.output} public static create(${domainCreateParameterValue}: ${propsName}): ${returnTypeModel.output} { ${statementsModel.output} }`;

  return {
    output: result,
    dependencies: [
      ...producedConstructor.dependencies,
      ...returnTypeModel.dependencies,
      ...statementsModel.dependencies,
      ...propsTypeDependencies,
      ...returnOkTypeDependencies,
    ],
  };
};
