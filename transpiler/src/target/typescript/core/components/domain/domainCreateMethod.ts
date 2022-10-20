import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import {
  TDomainCreateMethod,
  TStatement,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { internalConstructor } from './index.js';

const THIS_STATEMENT_DECLARATION = 'thisDeclaration';

export const domainCreate = (create: TDomainCreateMethod): TTargetDependenciesTypeScript => {
  const { parameterDependency, returnType, statements } = create;

  const statementsResult = {
    thisStatements: [],
    restStatements: [],
  };

  for (const statement of statements) {
    if (isStatmentThisDeclaration(statement)) {
      statementsResult.thisStatements.push(statement);
    } else {
      statementsResult.restStatements.push(statement);
    }
  }

  const propsName = create.parameterDependency.type;
  const returnOkType = returnType.ok;

  const producedConstructor = internalConstructor(
    propsName,
    statementsResult.thisStatements,
    ClassTypes.ValueObjects,
  );

  let statementsModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatementsWithoutThis,
    value: statementsResult.restStatements,
  });

  const parameterModel = modelToTargetLanguage({
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
  const ToLanguageMapping = (
    returnType: string,
    parameterString: string,
    methodStatements: string,
  ): string => {
    return `${producedConstructor.output} public static create(${parameterString}): ${returnType} { ${methodStatements} }`;
  };
  const result = ToLanguageMapping(
    returnTypeModel.output,
    parameterModel.output,
    statementsModel.output,
  );
  return {
    output: result,
    dependencies: [
      ...statementsModel.dependencies,
      ...parameterModel.dependencies,
      ...producedConstructor.dependencies,
      ...returnTypeModel.dependencies,
    ],
  };
};

const isStatmentThisDeclaration = (statement: TStatement): boolean => {
  return Object.keys(statement)[0] === THIS_STATEMENT_DECLARATION;
};
