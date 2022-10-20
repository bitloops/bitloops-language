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

// TODO refactor this with domainCreate method which is similar (only the constructor changes)
export const domainCreateEntity = (create: TDomainCreateMethod): TTargetDependenciesTypeScript => {
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
    ClassTypes.Entities,
  );

  let statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatementsWithoutThis,
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
    statementsString = {
      output: statementsString.output.concat(`return ok(new ${returnOkType}(props));`),
      dependencies: statementsString.dependencies,
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
    parameterString.output,
    statementsString.output,
  );
  return {
    output: result,
    dependencies: [
      ...producedConstructor.dependencies,
      ...statementsString.dependencies,
      ...parameterString.dependencies,
      ...returnTypeModel.dependencies,
    ],
  };
};

const isStatmentThisDeclaration = (statement: TStatement): boolean => {
  return Object.keys(statement)[0] === THIS_STATEMENT_DECLARATION;
};
