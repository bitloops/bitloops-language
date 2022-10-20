/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
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
    if (isStatementThisDeclaration(statement)) {
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

const isStatementThisDeclaration = (statement: TStatement): boolean => {
  return Object.keys(statement)[0] === THIS_STATEMENT_DECLARATION;
};
