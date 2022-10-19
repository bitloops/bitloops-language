import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TDomainCreateMethod, TStatement } from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { internalConstructor } from './index.js';

const THIS_STATEMENT_DECLARATION = 'thisDeclaration';

export const domainCreate = (create: TDomainCreateMethod, targetLanguage: string): string => {
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
    targetLanguage,
    ClassTypes.ValueObjects,
  );

  let statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatementsWithoutThis,
    value: statementsResult.restStatements,
    targetLanguage,
  });

  const parameterString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependency,
    value: parameterDependency,
    targetLanguage,
  });

  const returnTypeString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: returnType,
    targetLanguage,
  });

  const statementValues = statements.map((statement) => statement.valueOf());
  const hasReturnStatements: boolean =
    statementValues.filter(
      (statement) => Object.keys(statement)[0] === BitloopsTypesMapping.TReturnStatement,
    ).length === 0;
  if (hasReturnStatements || statements.length === 0) {
    statementsString = statementsString.concat(`return ok(new ${returnOkType}(props));`);
  }
  const ToLanguageMapping = {
    [SupportedLanguages.TypeScript]: (
      returnType: string,
      parameterString: string,
      methodStatements: string,
    ): string => {
      return `${producedConstructor} public static create(${parameterString}): ${returnType} { ${methodStatements} }`;
    },
  };
  const result = ToLanguageMapping[targetLanguage](
    returnTypeString,
    parameterString,
    statementsString,
  );
  return result;
};

const isStatmentThisDeclaration = (statement: TStatement): boolean => {
  return Object.keys(statement)[0] === THIS_STATEMENT_DECLARATION;
};
